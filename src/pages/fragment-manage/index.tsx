import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getFragment } from '@/api/film'
import { useParams } from 'react-router-dom'
import { Form, Select } from 'antd'
import { useState, useEffect } from 'react'
import videojs from 'video.js'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import Player from 'video.js/dist/types/player'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import '@/assets/style/video-reset.css'

videojs.addLanguage('zh-CN', zhLang)

const FragmentMange = () => {
  const queryClient = useQueryClient()
  const [ player, setPlayer ] = useState<Player>()
  const [ playState, setPlayState ] = useState(false)
  const { fragmentId } = useParams()
  const { data, isLoading } = useQuery({queryKey: ['getFragment', fragmentId], queryFn: () => getFragment(fragmentId!)})
  const [form, setForm] = useState({ value: 1 })
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
  }, [player])
  function registerVideoEvent(_player: Player) {
    _player.on('play', () => {
      setPlayState(true)
    })
    _player.on('pause', () => {
      setPlayState(false)
    })
    _player.on('timeupdate', (e: Event) => {
      // const target =  e.target as any
      // const { currentTime, duration: _duration  } = target.children[0] || {}
      // setCurrentTime(currentTime)
      // if (duration === 0) {
      //   setDuration(_duration)
      // }
    })
  }
  const playIconProp = {
    color: '#fff',
    style: {
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      fontSize: '50px',
      opacity: 0.8
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
  return <div>
    <Form inline>
      <Form.Item label='倍速' w-45>
        <Select value={form.value} onChange={handlePlaybackRates}>
          <Select.Option value={0.5}>0.5倍播放</Select.Option>
          <Select.Option value={1}>正常播放</Select.Option>
          <Select.Option value={1.5}>1.5倍播放</Select.Option>
        </Select>
      </Form.Item>
    </Form>
    <div relative w-240>
      <video 
        w-240
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
    {JSON.stringify(data)}
  </div>
}
export default FragmentMange