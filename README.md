# ICTInternship-FileViewer(React + Spring)
### ICT Internship(2021) file viewer website front-end & back-end
***
# File Viewer Website
해당 프로젝트는 디자인 팀의 요청사항으로 서버 안에 저장된 각종 이미지, 영상 소스들을 쉽게 볼 수 있고, 다운받을 수 있는 웹사이트를 개발하는 프로젝트입니다.
<br/><br/>
선택한 메뉴에 따라 선택한 메뉴에 일치하는 서버 디렉토리 내에 있는 모든 이미지파일, 영상파일을 썸네일 형식으로 보여주고, 클릭 시 해당 파일을 자세히 보여주고, 다운받을 수 있습니다.
<br/><br/><br/><br/>
***
# 프로젝트 기능
## 🔑Login
해당 사이트를 사용하는 집단간의 공유하는 아이디와 패스워드만 있으면 되기 때문에 회원가입은 구현하지 않았습니다.<br/><br/>
서버에 적재된 아이디, 비밀번호와 일치하면 로그인을 수행합니다.<br/><br/>
백엔드에 암호화 되어있는 id, pw가 저장되어있고, 프론트에서 사용자가 입력한 id, pw를 암호화하여 백엔드와 일치하는지 확인합니다.<br/><br/>
로그인 시 세션을 통하여 본문으로 이동할 수 있는 권한을 부여 받습니다.<br/><br/>
세션이 없으면 모든 URL 접근을 Login으로 이동하므로, 로그인을 성공하여야 본문으로 이동할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133401063-79e6a74e-34f3-4b44-9028-67b2959e045f.PNG" width="100%"/>
<br/><br/><br/><br/>
## 🏠Home
header 부분 로고와 Home 버튼을 클릭하여 Home으로 이동할 수 있습니다.<br/><br/>
Logout 버튼을 통하여 권한 세션을 없앤 뒤, 로그인 화면으로 이동합니다.<br/><br/>
body에서는 유의사항을 알려주고, 메뉴를 통하여 원하는 디렉토리로 이동합니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133565411-174f5022-6dc6-465c-ac2b-d4daf627ad98.PNG" width="100%"/>
<br/><br/><br/><br/>
## 📁Storage
저장소에서는 썸네일을 통해 해당 메뉴의 서버 디렉토리에 적재된 사진 및 영상 파일들을 보여줍니다.<br/><br/>
배경이 흰색인 소스와 투명인 소스를 구분하기 위하여 이미지 뒤에 투명을 표시하는 background-image를 넣었습니다.<br/><br/>
영상의 경우, 썸네일 위에 재생이 가능한 영상임을 표시하기 위해 재생 아이콘을 넣었습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726779-8c70fc15-9a66-4325-afd7-3f950f73a227.PNG" width="100%"/>
<br/><br/><br/><br/>
## 📖Detail View
썸네일을 클릭하면 해당 이미지, 영상을 자세히볼 수 있고 다운로드도 받을 수 있는 모달 창을 띄웁니다.<br/><br/>
과도하게 큰 이미지, 영상을 방지하기 위하여 최대 너비, 높이보다 큰 이미지의 경우 이미지 가로세로 비율에 맞게 줄여서 나타냅니다.<br/><br/>
나머지 이미지, 영상은 소스의 크기를 파악하기 위하여 원본 픽셀로 나타내며 X 버튼을 클릭하여 모달창을 닫을 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726739-040dbf89-5187-40c2-b90f-b347ff6ed7db.PNG" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/133726689-d5ffa0ff-54e9-4c89-a908-658dadbfeed5.PNG" width="48%"/>
<br/><br/><br/><br/>
## 🎨Change Background
배경색과 이미지, 영상 소스의 색상이 비슷하여 식별이 힘든 상황을 방지하기 위하여 배경 색상을 변경할 수 있는 기능입니다.<br/><br/>
상단 3가지 버튼을 통하여 투명한 회색, 흰색, 검은색의 바탕으로 이미지, 영상을 열람할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726572-60801089-cbf8-4ab7-af15-4c2fb4575d12.PNG" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/133726539-18a87c9b-f28d-4aec-8194-47b3de4e523b.PNG" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/133726481-c2f18d40-d277-47ad-885f-80a50831c195.PNG" width="32%"/>
<br/><br/><br/><br/>
## 🔎Zoom In & Out
이미지를 확대, 축소하여 열람할 수 있는 기능입니다.<br/><br/>
(-) 버튼으로 축소, (+) 버튼으로 확대 가능하며 최대 크기를 벗어날 수 없습니다.<br/><br/>
가운데 현재 배율이 표시된 버튼을 클릭하면 원본 크기로 돌아갑니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726295-eb7a2f8c-d512-4bcf-a94d-0000616e0665.PNG" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/133726410-d2382aa8-42ab-4fe0-835a-9797a47e43ff.PNG" width="32%"/> <img src = "https://user-images.githubusercontent.com/60428537/133726352-090dba53-1b72-4c09-8c28-9abc4dc70111.PNG" width="32%"/>
<br/><br/><br/><br/>
## 💾Download
다운로드 버튼을 클릭하여 열람하고 있는 파일을 다운로드 받을 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/133726234-7b0380c3-ed8f-402b-aa32-99e7611da3dc.PNG" width="100%"/>
<br/><br/><br/><br/>
***
# 개선 사항
## ☝Page Number
한 번에 너무 많은 컴포넌트가 로드되는 것을 방지하기 위하여 페이지 번호를 추가하였습니다.<br/><br/>
가져온 파일리스트의 파일 개수에 따라 페이지 번호를 지정합니다. <br/><br/>
페이지 번호를 선택하게 되면, 해당 번호의 출력되는 컴포넌트 개수만큼 slice하여 썸네일 컴포넌트를 호출하고<br/><br/>
썸네일 컴포넌트 내부에서 해당 파일정보에 맞는 이미지를 Spring에 요청합니다. <br/><br/>
프론트에서 요청할 때 보낸 message를 토대로 백엔드 로컬에서 이미지 및 동영상을 찾아 byteArray로 프론트에 전송하고 프론트에서 출력합니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/135576643-30c45865-48c1-436a-bd5a-abaf0d0b9949.png" width="100%"/>
<br/><br/><br/><br/>
