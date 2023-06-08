import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getFragment } from '@/api/film'
import { useParams } from 'react-router-dom'
import { Form, Select, Slider, Button, Input } from 'antd'
import { useState, useEffect } from 'react'
import videojs from 'video.js'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import Player from 'video.js/dist/types/player'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import '@/assets/style/video-reset.css'
import copy from 'copy-to-clipboard'

videojs.addLanguage('zh-CN', zhLang)
interface CaptionProp {
  start: string
  end: string
  en: string
  cn: string
}
const FragmentMange = () => {
  const queryClient = useQueryClient()
  const [ player, setPlayer ] = useState<Player>()
  const [ playState, setPlayState ] = useState(false)
  const { fragmentId } = useParams()
  const { data, isLoading } = useQuery({queryKey: ['getFragment', fragmentId], queryFn: () => getFragment(fragmentId!)})
  const [form, setForm] = useState({ value: 1 })
  const [caption, setCaption] = useState<CaptionProp[]>([])
  const [durationTime, setDurationTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [slidrTime, setSlidrTime] = useState(0)
  const [formRef] = Form.useForm();
  useEffect(() => {
    if (data) {
      const _player: Player = videojs('video-play', {
        autoPlay: true,
        controlBar: { children: [] },
        techOrder: ['html5'],
        sources: [
          {src: data.fragmentUrl}
        ]
      })
      setPlayer(_player)
      return () => {
        _player.dispose()
      }
    }
  }, [data])
  // 用于注册play事件
  useEffect(() => {
    if (!player) return
    registerVideoEvent(player)
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('keydown', keydown);
    }
  }, [player])
  function keydown(e: any) {
    if (!player) return
    const currentTime = player.currentTime()
    // 32是空格 37是左 39是右
    if (e.keyCode === 32) {
      if (player.paused()) {
        player.play() 
      } else {
        player.pause()
      }
    }
    if (e.keyCode === 37) {
      player.currentTime(currentTime - 2)
    }
    if (e.keyCode === 39) {
      player.currentTime(currentTime + 2)
    }
  }
  function registerVideoEvent(_player: Player) {
    _player.on('play', () => {
      setPlayState(true)
    })
    _player.on('pause', () => {
      setPlayState(false)
    })
    _player.on('timeupdate', (e: Event) => {
      const target =  e.target as any
      const { currentTime, duration  } = target.children[0] || {}
      setCurrentTime(currentTime)
      if (durationTime === 0) {
        setDurationTime(duration)
      }
    })
  }
  const playIconProp = {
    style: {
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      fontSize: '50px',
      opacity: 0.8,
      color: '#fff'
    }
  }
  function onPlay() {
    player?.play()
  }
  function onPause() {
    player?.pause()
  }
  function handlePlaybackRates(value: number) {
    setForm({...form, value})
    player!.playbackRate(value)
  }
  function changeSlider(value: number) {
    setSlidrTime(value)
  }
  function onAfterChange(value: number) {
    player!.currentTime(value / 10000)
    setCurrentTime(value / 10000)
    setSlidrTime(0)
  }
  // 传入毫秒 设置 00:00 格式
  function getFormattTime(time: number) {
    const m = Math.floor(time / 60).toString()
    const s = Math.floor(time % 60).toString()
    return m.padStart(2, '0') + ":" + s.padStart(2, '0')
  }
  const setTime = (millisecond: number) => () => {
    if (!player) return
    if (!player.paused()) {
      player.pause() 
    }
    const currentTime = player.currentTime()
    player!.currentTime(currentTime + (millisecond / 1000))
  }
  function _copy() {
    copy((currentTime * 1000).toFixed(0))
  }
  function onFinish(values: CaptionProp) {
    console.log(values);
  }
  return <div flex>
    <div w-200 m-r-5>
      <Form inline>
        <Form.Item label='倍速' w-45>
          <Select value={form.value} onChange={handlePlaybackRates}>
            <Select.Option value={0.5}>0.5倍播放</Select.Option>
            <Select.Option value={1}>正常播放</Select.Option>
            <Select.Option value={1.5}>1.5倍播放</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <div relative w-220 m-b-2>
        <video 
          w-200
          h-auto
          style={{border: 'none', verticalAlign: 'middle'}}
          object-fit='cover'
          id='video-play'
          playsInline 
        />
        <div>
          {
            playState 
            ?
            <PauseCircleOutlined {...playIconProp as any} onClick={onPause}/>
            :
            <PlayCircleOutlined {...playIconProp as any} onClick={onPlay}/>
          }
        </div>
      </div>
      <div flex flex-items-center w-200 m-b-3>
        <span m-r-2>{getFormattTime(currentTime)}</span>
        <div flex-1 >
          <Slider 
            max={durationTime * 10000} 
            tooltip={{formatter: () => getFormattTime(currentTime)}} 
            value={slidrTime || currentTime * 10000}
            onChange={changeSlider}
            onAfterChange={onAfterChange}
          />
        </div>
        <span m-l-2>{getFormattTime(durationTime)}</span>
      </div>
      <div m-b-7 flex flex-items-center>
        <p m-r-1 w-25>{(currentTime * 1000).toFixed(0)}毫秒</p>
        <Button m-r-15 type='primary' size='small' onClick={_copy}>复制秒数</Button>
        <Button m-r-3 type='primary' size='small' onClick={setTime(-500)}>减500毫秒</Button>
        <Button m-r-3 type='primary' size='small' onClick={setTime(-200)}>减200毫秒</Button>
        <Button m-r-15 type='primary' size='small' onClick={setTime(-50)}>减50毫秒</Button>
        <Button m-r-3 type='primary' size='small' onClick={setTime(50)}>加50毫秒</Button>
        <Button m-r-3 type='primary' size='small' onClick={setTime(200)}>加200毫秒</Button>
        <Button type='primary' size='small' onClick={setTime(500)}>加500毫秒</Button>
      </div>
      <Form 
        labelCol={{span: 3}} 
        wrapperCol={{span: 8}} 
        labelAlign='left' 
        requiredMark={false}
        onFinish={onFinish}
        w-200
      >
        <Form.Item 
          flex-1
          label='开始时间' 
          name='start' 
          rules={[{ required: true, message: '请输入开始时间' }]}
        >
          <Input w-50 placeholder='开始时毫秒数' />
        </Form.Item>
        <Form.Item 
          flex-1
          label='结束时间' 
          name='end'
          rules={[{ required: true, message: '请输入结束时间' }]}
        >
          <Input w-50 placeholder='结束时毫秒数' />
        </Form.Item>
        <Form.Item label='英文原文'name='en' rules={[{ required: true, message: '请输入英文原文' }]}>
          <Input.TextArea placeholder='请输入英文原文' />
        </Form.Item>
        <Form.Item label='中文译文' name='cn' rules={[{ required: true, message: '请输入中文译文' }]}>
          <Input.TextArea placeholder='请输入中文译文' />
        </Form.Item>
        <Form.Item labelCol={{span: 3}} wrapperCol={{span: 8, offset: 3}}>
          <div>
            <Button m-r-2>取消</Button>
            <Button type='primary' htmlType='submit'>确认</Button>
          </div>
        </Form.Item>
      </Form>
      {/* {JSON.stringify(data)} */}
      {/* <input onKeyDown={(event: any) => event.stopPropagation()} /> */}
    </div>
    <ul flex-1 bg-blue>

    </ul>
  </div>
}
export default FragmentMange