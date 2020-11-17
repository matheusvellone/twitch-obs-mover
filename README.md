twitch-obs-mover
---

### Commands
- `!right [number]`: Move the source `100/STEPS * _number_` percent to the right
- `!left [number]`: Move the source `100/STEPS * _number_` percent to the left
- `!up [number]`: Move up the source by `100/STEPS * _number_` percent
- `!down [number]`: Move down the source by `100/STEPS * _number_` percent
- `!random [number]`: Move the source to a random direction _number_ times

The default value for _number_  is `1`.

### Setup
1. Download and install [obs-websocket](https://github.com/Palakis/obs-websocket). Restart OBS if it was open when you installed.
2. `cp .env.example .env` and set your twitch channel name in `CHANNEL`
3. Set the `SCENE_NAME` and the `MOVABLE_SOURCE` you want the chat to control position
4. Set `WIDTH` and `HEIGHT` according to your screen size
5. Set how much `STEPS` is necessary to move from one side to another
6. `npm install`
7. `npm start` while streaming
