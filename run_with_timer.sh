#!/bin/bash
echo "พิมพ์คำสั่งที่ต้องการรัน: "
read command   # รับคำสั่งจากผู้ใช้

start=$(date +%s)   # จับเวลาเริ่มต้น
eval "$command"     # รันคำสั่งที่ผู้ใช้พิมพ์
end=$(date +%s)     # จับเวลาสิ้นสุด

duration=$(( end - start ))   # คำนวณเวลา
echo "ใช้เวลาในการรันคำสั่ง: $duration วินาที"
