import { Button, Modal, Form, Input, Upload, message, Skeleton } from 'antd'
import type { UploadProps } from 'antd'
import { useState } from 'react'
import { PlusOutlined, LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/es/upload'
import { addFilm, getFilmList } from '@/api/film'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

function FilmManage() {
  const [form] = Form.useForm();
  const [addState, setAddState ] = useState(false)
  const [fragmentState, setFragmentState] = useState(false)
  const [loading, setLoading ] = useState(false)
  const [uploading, setUploading ] = useState(false)
  const [imgUrl, setImgUrl] = useState<string>()
  const queryClient = useQueryClient()
  const { data = [], isLoading } = useQuery({queryKey: ['filmList'], queryFn: getFilmList})
  const { mutate } = useMutation({
    mutationFn: addFilm,
    onSuccess: () => {
      setLoading(false)
      message.success('创建电影成功')
      queryClient.invalidateQueries({ queryKey: ['filmList'] })
    },
    onError: () => {
      setLoading(false)
    }
  })
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
    mutate(values)
  }
  function openFragment(id: string) {
    setFragmentState(true)
    console.log(id);
  }
  return <div>
    <Button type='primary' onClick={_addFilm}>新建电影</Button>
    <ul flex m-r-5 p-y-5 flex-wrap>
      {
        isLoading
        ? 
        <li flex flex-col>
          <Skeleton.Image style={{height: '160px', width: '120px', marginBottom: '5px'}} active />
          <Skeleton.Input style={{height: '18px', width: '120px'}} size="small" active />
        </li>
        :
        data.map(film => {
          return <li key={film.id} m-r-5 m-b-5 cursor-pointer onClick={() => openFragment(film.id)}>
            <img w-30 h-40 object-cover src={film.filmCover} alt={film.filmName} />
            <h4 p-y-1>{film.filmName}</h4>
            <div>
              <Button type="primary" size='small' m-r-2 shape="circle" icon={<EditOutlined />} />
              <Button type="primary" danger size='small' shape="circle" icon={<DeleteOutlined />} />
            </div>
          </li>
        })
      }
    </ul>
    <Modal 
      title='新增电影' 
      open={addState} 
      confirmLoading={loading} 
      onCancel={handleCancel} 
      destroyOnClose={true}
      onOk={() => form.submit()}
      cancelText='取消'
      okText='确认'
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
    <Modal
      title='查看电影片段'
      open={fragmentState}
      cancelText='取消'
      okText='确定添加'
    >
      <div>123</div>
    </Modal>
  </div> 
}

export default FilmManage

function getToken() {
  return localStorage.getItem('token')
}