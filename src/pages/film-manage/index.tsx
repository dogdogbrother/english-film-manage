import { Button, Modal, Form, Input, Upload, message, Skeleton } from 'antd'
import type { UploadProps } from 'antd'
import { useState } from 'react'
import { PlusOutlined, LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/es/upload'
import { addFilm, getFilmList, addFragment, getFragmentList } from '@/api/film'
import type { FragmentProp } from '@/api/film'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

function FilmManage() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [fragmentForm] = Form.useForm();
  const [currentFilmId, setCurrentFilmId] = useState<string>()
  const [addState, setAddState ] = useState(false)
  const [fragmentState, setFragmentState] = useState(false)
  const [fragmentList, setFragmentList] = useState<FragmentProp[]>([])
  const [fragmentLoading, setFragmentLoading] = useState(false)
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
      setAddState(false)
      queryClient.invalidateQueries({ queryKey: ['filmList'] })
    },
    onError: () => {
      setLoading(false)
    }
  })
  const { mutate: getFragmentListMutate } = useMutation({
    mutationFn: getFragmentList,
    onSuccess: setFragmentList
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
    setCurrentFilmId(id)
    getFragmentListMutate(id)
  }
  function onAddFragment(vlues: any) {
    setFragmentLoading(true)
    addFragment({...vlues, filmId: currentFilmId}).then(() => {
      message.success('添加剧集成功')
      getFragmentListMutate(currentFilmId!)
    }).finally(() => setFragmentLoading(false))
  }
  function toFragmentManage(fragmentId: string) {
    setFragmentState(false)
    navigate(`/fragment-manage/${fragmentId}`)
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
              <Button type="primary" size='small' m-r-2 shape="circle" icon={<EditOutlined /> as any} />
              <Button type="primary" danger size='small' shape="circle" icon={<DeleteOutlined /> as any} />
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
      onCancel={() => setFragmentState(false)}
      footer={null}
      destroyOnClose={true}
    >
      <div p-t-2>
        <ul>
          {
            fragmentList.map(fragment => <li overflow-hidden m-b-2 key={fragment.id}>
              <Button type='link' onClick={() => toFragmentManage(fragment.id)}>{fragment.fragmentUrl}</Button>
            </li>)
          }
        </ul>
        <Form preserve={false} form={fragmentForm} p-t-2 onFinish={onAddFragment}>
          <Form.Item label="片段地址" name="fragmentUrl" rules={[{ required: true, message: '请输入片段地址的url' }]}>
            <div>
              <Input placeholder='请输入片段地址的url' w-60 m-r-2 m-b-3/>
              <Button type='primary' htmlType="submit" loading={fragmentLoading}>确认添加</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  </div> 
}

export default FilmManage

function getToken() {
  return localStorage.getItem('token')
}