#!/bin/bash
start_time=$(date +%s)

# Deploy คำสั่ง
firebase deploy

end_time=$(date +%s)
duration=$((end_time - start_time))

echo "Deploy ใช้เวลา $duration วินาที"
