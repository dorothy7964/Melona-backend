import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({  
    accessKeyId: process.env.AWS_KEY,         // 생성한 s3의 accesskey
    secretAccessKey: process.env.AWS_SECRET,  // 생성한 s3의 secret key
    region: "ap-northeast-2"                  // 지역설정
});

const upload = multer({ 
    storage: multerS3({
        s3,
        acl: 'public-read',                         // 업로드 된 데이터를 URL로 읽을 때 설정하는 값입니다. 업로드만 한다면 필요없습니다.
        bucket: "melona.cf",                        // s3 생성시 버킷명
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});  // 파일 메타정보를 저장합니다.
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }  
    }) 
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
    const { file: { location } } = req;
    res.json({ location });
};
