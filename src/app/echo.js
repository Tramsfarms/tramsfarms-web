import axios from "axios";
import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: "umhsjcetaqgb884vmxqe",
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post("/api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
  wsHost: "localhost",
  wsPort: 80,
  wssPort: 443,
  forceTLS: "https" === "https",
  enabledTransports: ["ws", "wss"],
});
