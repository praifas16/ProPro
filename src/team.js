// src/team.js
function createTeam(classroomName, subject, description) {
    // จำลองการสร้างทีมในฐานข้อมูล เช่น การใช้งาน Firebase
    return Promise.resolve({ id: 'mock_team_id' });
}

function joinTeam(joinCode) {
    // จำลองการเข้าร่วมทีมในฐานข้อมูล
    return Promise.resolve({ success: true });
}

module.exports = { createTeam, joinTeam };
