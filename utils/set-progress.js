import axios from 'axios'

export default function setProgress({episode, progress}) {
  return axios.post('/api/set-progress', {
    episode,
    progress,
  })
}
