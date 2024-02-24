const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.body.id;
    const contentDir = path.join(__dirname, `../resources/images/${userId}`);
    if (!fs.existsSync(contentDir)) { // 해당 디렉터리가 존재 하지 않으면 디렉터리를 생성한다.
      fs.mkdirSync(contentDir, { recursive: true });
    }
    cb(null, contentDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 파일명이 중복되지 않도록 날짜 + 파일명을 둔다. 확장자명 까지 같이 저장하기 위해서 파일명을 제일 마지막에 둔다.
  }
});

const upload = multer({ storage: storage });

module.exports = upload;