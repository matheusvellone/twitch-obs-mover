require('dotenv/config')
const tmi = require('tmi.js')
const {
  clamp,
  find,
  pipe,
  prop,
  propEq,
} = require('ramda')

const OBSWebSocket = require('obs-websocket-js')

const {
  CHANNEL,
  OBS_WS_HOST,
  OBS_WS_PASSWORD,
  STEPS = 20,
  WIDTH = 1920,
  HEIGHT = 1080,
  SCENE_NAME,
  MOVABLE_SOURCE,
} = process.env

const obs = new OBSWebSocket()

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [ CHANNEL ]
})

const move = async (v, h) => {
  const response = await obs.send('GetSceneList')
  const webcam = getWebcamSource(response)

  const stepW = (WIDTH - webcam.source_cx) / STEPS
  const stepH = (HEIGHT - webcam.source_cy) / STEPS

  await obs.send('SetSceneItemProperties', {
    'scene-name': SCENE_NAME,
    item: MOVABLE_SOURCE,
    position: {
      x: clamp(0, WIDTH - webcam.source_cx, webcam.x + stepW * h),
      y: clamp(0, HEIGHT - webcam.source_cy, webcam.y + stepH * v),
    }
  })
}

const getWebcamSource = pipe(
  prop('scenes'),
  find(propEq('name', SCENE_NAME)),
  prop('sources'),
  find(propEq('name', MOVABLE_SOURCE))
)

const run = async () => {
  await obs.connect({
    address: OBS_WS_HOST,
    password: OBS_WS_PASSWORD,
  })

  await client.connect()

  console.log('Connected')

  client.on('message', (channel, tags, message) => {
    switch (message) {
      case '!up':
        return move(-1, 0)
      case '!down':
        return move(1, 0)
      case '!right':
        return move(0, 1)
      case '!left':
        return move(0, -1)
    }
  })
}

run()
