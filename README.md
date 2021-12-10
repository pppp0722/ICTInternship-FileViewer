# ICTInternship-FileViewer(React + Spring)
### ICT Internship(2021) file viewer website front-end & back-end
***
# File Viewer Website

<img src = "https://user-images.githubusercontent.com/60428537/139192758-876b81fd-f81d-4a2e-82c3-5f40acfb489a.png" width="100%"/>

<br/><br/><br/><br/>
***
# 프로젝트 기능
## 🔑Login
입력한 ID, PW 가 일치하면 인증 세션을 부여 받고, 본문으로 이동합니다.<br/><br/>
인증 세션은 해당 창을 닫을 때 까지 유지 되고, 인증 세션이 없으면 본문으로 이동할 수 없습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145522838-212cf322-4f88-4983-85ec-b704fd9f8dc7.png" width="100%"/>
<br/><br/><br/><br/>
## 🏠Home
본문은 root 디렉토리에서 시작합니다.<br/><br/>
상단 header 에서는 현재 디렉토리 주소를 출력하고, 로그아웃 버튼이 존재합니다.<br/><br/>
body의 좌측 side bar 에서는 모든 디렉토리를 tree 구조로 보여주며, 펼치거나 클릭하여 해당 디렉토리로 이동할 수 있습니다.<br/><br/>
body의 우측 view 에서는 현재 디렉토리 내 모든 파일, 디렉토리를 아이콘으로 보여줍니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145524031-f1a5d9a6-f34b-4263-b578-96940136432a.png" width="100%"/>
<br/><br/><br/><br/>
## 📁View
현재 디렉토리 내 모든 파일, 디렉토리를 아이콘 형식으로 출력합니다.<br/><br/>
add 버튼으로 파일 업로드, 디렉토리 생성을 할 수 있습니다.<br/><br/>
back 버튼으로 부모 디렉토리로 이동할 수 있습니다.<br/><br/>
디렉토리 아이콘을 클릭하면 해당 디렉토리로 이동합니다.<br/><br/>
파일 아이콘을 클릭하면 해당 파일을 자세히 볼 수 있는 Detail로 이동합니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145524191-910a5804-12f7-453a-8df7-52f8a846fefc.png" width="100%"/><br/><br/>
<br/><br/><br/><br/>
## 📖Detail View
아이콘을 클릭하면 해당 파일을 자세하게 열람할 수 있습니다.<br/><br/>
이미지의 경우 확대&축소, 배경 색상 변경, 삭제, 다운로드 기능을 사용할 수 있습니다.<br/><br/>
동영상, 오디오 파일은 재생, 삭제, 다운로드 기능을 사용할 수 있습니다.<br/><br/>
나머지 파일은 삭제, 다운로드 기능을 사용할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145525042-eb338aa5-f890-4d91-9ae5-7ec6eeac9a47.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/145525770-0eff9b69-6cee-43fa-a965-036525d3442b.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/145525920-cade7e14-c8a4-424f-ac7f-168daab501fc.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/145526173-2a927684-41d8-43b3-a266-a36f1f222ac0.png" width="48%"/>
<br/><br/><br/><br/>
## 🎨Change Background
배경색과 이미지, 영상 소스의 색상이 비슷하여 식별이 힘든 상황을 방지하기 위하여 배경 색상을 변경할 수 있는 기능입니다.<br/><br/>
상단 3가지 버튼을 통하여 투명한 회색, 흰색, 검은색의 바탕으로 이미지, 영상을 열람할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145525042-eb338aa5-f890-4d91-9ae5-7ec6eeac9a47.png" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/145529238-79ed10ff-6f6a-480d-8ea0-d2556f997012.png" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/145529366-d7b268bf-72f4-4e96-b16b-21f8d0036a07.png" width="32%"/>
<br/><br/><br/><br/>
## 🔎Zoom In & Out
이미지를 확대, 축소하여 열람할 수 있는 기능입니다.<br/><br/>
(-) 버튼으로 축소, (+) 버튼으로 확대 가능하며 최대 크기를 벗어날 수 없습니다.<br/><br/>
가운데 현재 배율이 표시된 버튼을 클릭하면 원본 크기로 돌아갑니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145529516-e0a41170-f074-43eb-9ec3-21f1dde83144.png" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/145529610-82c31331-9616-470f-9589-c63ee2d8289d.png" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/133726352-090dba53-1b72-4c09-8c28-9abc4dc70111.PNG" width="32%"/>
<br/><br/><br/><br/>
## 💾Download
다운로드 버튼을 클릭하여 열람하고 있는 파일을 다운로드 받을 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726234-7b0380c3-ed8f-402b-aa32-99e7611da3dc.PNG" width="100%"/>
<br/><br/><br/><br/>
## ➕add
add 버튼을 클릭하면 여러가지 이미지, 동영상들을 한번에 업로드 하거나 새 디렉토리를 생성할 수 있는 모달 창을 띄웁니다.<br/><br/>
업로드 버튼을 클릭하여 파일들을 선택하여 업로드 하거나, 생성 버튼으로 디렉토리를 생성할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145527847-44821d0f-50b1-4ccf-b6f2-ada280681d69.png" width="100%"/>
<br/><br/><br/><br/>
## 🗑Delete
detail에서 delete 버튼을 클릭하여 파일을 삭제할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/136172117-e75860c3-1d06-4a14-acf9-a9f2c48cc35e.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/136352348-917d00d9-759c-42d8-bc04-32daeacb2a0a.png" width="48%"/><br/><br/>
view 에서도 아이콘 hover 시 삭제 버튼이 드러나며 디렉토리, 파일을 삭제할 수 있습니다.<br/><br/>
삭제 버튼 클릭 시 되 묻는 alert가 생성되고, 디렉토리 삭제 시 해당 디렉토리 명을 입력해야 삭제할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145524737-a0e19357-ef23-4611-b56a-75e9a61e58e0.png" width="50%"/>
<br/><br/><br/><br/>
