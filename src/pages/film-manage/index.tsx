import { Button, Modal, Form, Input, Upload } from 'antd'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function FilmManage() {
  const navigate = useNavigate()
  const [addState, setAddState ] = useState(false)
  const [loading, _setLoading ] = useState(false)

  function addFilm() {
    setAddState(true)
  }
  function handleCancel() {
    setAddState(false)
  }
  function submit() {
    navigate('/fragment-manage')
    // console.log('提交');
  }
  return <div>
    <Button type='primary' onClick={addFilm}>新建电影</Button>
    <Modal 
      title='新增电影' 
      open={addState} 
      confirmLoading={loading} 
      onCancel={handleCancel} 
      destroyOnClose={true}
      onOk={submit}
    >
      <Form preserve={false}>
        <Form.Item label="电影名称" name="filmName">
          <Input placeholder='请输入电影名称' w-60/>
        </Form.Item>
        <Form.Item label="电影封面" valuePropName='filmCover'>
          <Upload listType="picture-card">
            <PlusOutlined />
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  </div> 
}

export default FilmManage