import io from 'socket.io-client';
export const socket = io('http://localhost:4000');
export const configuration = {
  iceServers: [
    {
      url: 'turn:turn.bistri.com:80',
      username: 'homeo',
      credential: 'homeo'
    },
    { url: 'stun:stun.l.google.com:19302' }
  ]
};
