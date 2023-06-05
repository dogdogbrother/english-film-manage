import { Button, Modal, Form, Input, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/es/upload'
import { addFilm, getFilmList } from '@/api/film'
import { useQueryClient, useQuery } from '@tanstack/react-query'
function FilmManage() {
  const [form] = Form.useForm();
  const [addState, setAddState ] = useState(false)
  const [loading, setLoading ] = useState(false)
  const [uploading, setUploading ] = useState(false)
  const [imgUrl, setImgUrl] = useState<string>()
  const { data = [], isLoading } = useQuery({queryKey: ['filmList'], queryFn: getFilmList})
  function _addFilm() {
    setAddState(true)
  }
  function handleCancel() {
    setAddState(false)
    setImgUrl(undefined)
  }
  const uploadProps: UploadProps  = {
    listType: 'picture-card',
    name: 'file',
    action: '/api/file/img',
    headers: { Authorization: `Bearer ${getToken()}`},
    showUploadList: false,
    onChange(info: UploadChangeParam) {
      const { status, response } = info.file
      if (status === 'uploading') {
        setUploading(true)
      }
      if (status === 'done') {
        setUploading(false)
        form.setFieldValue('filmCover', response.url)
        setImgUrl(response.url)
      }
    }
  }
  function onFinish(values: any) {
    setLoading(true)
    addFilm(values).then(() => {
      message.success('创建电影成功')
      handleCancel()
    }).finally(() => setLoading(false))
  }
  return <div>
    <Button type='primary' onClick={_addFilm}>新建电影</Button>
    <ul flex m-r--5 p-y-5 cursor-pointer>
      {data.map(film => {
        return <li key={film.id} m-r-5>
          <img w-30 h-40 object-cover src={film.filmCover} alt={film.filmName} />
          <div p-y-1>
            <h4>{film.filmName}</h4>
          </div>
        </li>
      })}
    </ul>
    <Modal 
      title='新增电影' 
      open={addState} 
      confirmLoading={loading} 
      onCancel={handleCancel} 
      destroyOnClose={true}
      onOk={() => form.submit()}
      cancelText='取消'
      okText='确定添加'
    >
      <Form preserve={false} form={form} p-t-2 onFinish={onFinish}>
        <Form.Item label="电影名称" name="filmName" rules={[{ required: true, message: '请输入电脑名称' }]}>
          <Input placeholder='请输入电影名称' w-60/>
        </Form.Item>
        <Form.Item label="电影封面" valuePropName='filmCover' name='filmCover' rules={[{ required: true, message: '请上传电影封面图片' }]}>
          <Upload {...uploadProps}>
              {uploading && <LoadingOutlined />}
              {(!uploading && imgUrl) && <img style={{width: '100px', height: '100px', objectFit: 'cover'}} src={imgUrl} />}
              {(!uploading && !imgUrl) && <PlusOutlined />}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  </div> 
}

export default FilmManage

function getToken() {
  return localStorage.getItem('token')
}