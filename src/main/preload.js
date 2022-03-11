const { contextBridge, ipcRenderer } = require('electron');
const { videoInfo } = require('ytdl-core');

contextBridge.exposeInMainWorld('electron', {
  getInfo(song) {
    return ipcRenderer.invoke('info', song);
  },
  download(songs) {
    return ipcRenderer.invoke('download', songs);
  },

  onDownloadProgress(callback) {
    return ipcRenderer.on('download-progress', callback);
  },
  onDownloadError(callback) {
    return ipcRenderer.on('download-error', callback);
  },
  onDownloadEnd(callback) {
    return ipcRenderer.on('download-end', callback);
  },
});
