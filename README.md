twitch-obs-mover
---

### Setup
1. Download and install [obs-websocket](https://github.com/Palakis/obs-websocket). Restart OBS if it was open when you installed.
2. `cp .env.example .env` and set your twitch channel name in `CHANNEL`
3. Set the `SCENE_NAME` and the `MOVABLE_SOURCE` you want the chat to control position
4. Set `WIDTH` and `HEIGHT` according to your screen size
5. Set how much `STEPS` is necessary to move from one side to another
6. `npm install`
7. `npm start`
