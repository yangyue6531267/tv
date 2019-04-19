const PREFIX = 'DetailRecord'; // 表名
// const programId = "programId";  //节目Id
const currentEpisode = 'currentEpisode'; // 当前播放集数
const currentSchedule = 'currentSchedule'; // 当前播放的进度
const recordTime = 'recordTime'; // 记录时间

function recordLastPsId (id) {
  localStorage.setItem(PREFIX + 'LastPsId', id);
}

function getLastPsId () {
  return localStorage.getItem(PREFIX + 'LastPsId');
}

function cleanRecordByProgramId (programId) {
  localStorage.removeItem(PREFIX + programId);
}

function recordSchedule (programId, currentEpisode, currentSchedule) {
  console.log('recordSchedule programId = ' + programId + ' currentEpisode = ' + currentEpisode +
    ' currentSchedule = ' + currentSchedule);
  cleanRecordByProgramId(programId);
  // let json = {"currentEpisode":0, "currentSchedule":0};
  let json = {};
  json.currentEpisode = currentEpisode;
  json.currentSchedule = currentSchedule;
  console.log('recordSchedule json = ' + JSON.stringify(json));
  localStorage.setItem(PREFIX + programId, JSON.stringify(json));
}

function recordPlayTime (time) {

}

function checkExist (programId) {
  let item = localStorage.getItem(PREFIX + programId);
  if (item != null && typeof (item) != 'undefined') {
    return true;
  } else {
    return false;
  }
}

function getRecord (programId) {
  let record = localStorage.getItem(PREFIX + programId);
  if (record == null || record == '' || typeof (record) == 'undefined') { return { currentEpisode: 0, currentSchedule: 0 }; }

  // 不知原因的容错
  let result = JSON.parse(record);
  if (result.currentEpisode == null) { result.currentEpisode = 0; }
  if (result.currentSchedule == null) { result.currentSchedule = 0; }
  return result;
}

function logAllData () {

}

export default {
  cleanRecordByProgramId,
  recordSchedule,
  checkExist,
  getRecord,
  recordLastPsId,
  getLastPsId
}
