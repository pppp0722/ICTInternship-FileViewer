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
<img src = "https://user-images.githubusercontent.com/60428537/145524191-910a5804-12f7-453a-8df7-52f8a846fefc.png" width="100%"/>
아이콘 hover 시 삭제 버튼이 드러나며 디렉토리, 파일을 삭제할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/145524737-a0e19357-ef23-4611-b56a-75e9a61e58e0.png" width="50%"/>
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
## 🔗Upload
업로드 버튼을 클릭하여 여러가지 이미지, 동영상들을 한번에 업로드할 수 있습니다.<br/><br/>
선택한 파일들은 현재 선택한 메뉴에 맞는 서버 내 디렉토리에 적재됩니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/135984311-eed1ca3d-96cb-48ef-9fac-fc7bb21dda5f.PNG" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/135984363-6267d39b-cf09-4005-91b5-34b8870a7f1d.PNG" width="48%"/>
<br/><br/><br/><br/>
## 🗑Delete
딜리트 버튼을 클릭하여 파일을 삭제할 수 있습니다.<br/><br/>
동영상 파일의 경우 썸네일까지 한번에 삭제됩니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/136172117-e75860c3-1d06-4a14-acf9-a9f2c48cc35e.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/136352348-917d00d9-759c-42d8-bc04-32daeacb2a0a.png" width="48%"/>
<br/><br/><br/><br/>
## 🔊Audio View
특정 메뉴는 오디오 파일들을 열람할 수 있습니다.<br/><br/>
오디오 리스트 중 한 가지 오디오를 클릭하면 해당 오디오를 듣기, 저장, 지우기 등을 할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/137057339-ca194723-4e93-42d4-b6ab-779e1a8df0f9.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/137057455-2e1d6508-53a9-4ebd-9296-7cc0e0c035e9.png" width="48%"/>
<br/><br/><br/><br/>
***
# 개선 사항
## ☝Page Number
한 번에 너무 많은 컴포넌트가 로드되는 것을 방지하기 위하여 페이지 번호를 추가하였습니다.<br/><br/>
가져온 파일리스트의 파일 개수에 따라 페이지 번호를 지정합니다. <br/><br/>
페이지 번호를 선택하게 되면, 해당 번호의 출력되는 컴포넌트 개수만큼 slice하여 썸네일 컴포넌트를 호출하고<br/><br/>
썸네일 컴포넌트 내부에서 해당 파일정보에 맞는 이미지를 Spring에 요청합니다. <br/><br/>
프론트에서 요청할 때 보낸 message를 토대로 백엔드 로컬에서 이미지 및 동영상을 찾아 프론트에 전송하고 프론트에서 출력합니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/135576643-30c45865-48c1-436a-bd5a-abaf0d0b9949.png" width="100%"/>
<br/><br/><br/><br/>
## ☝Create Thumbnail
기존의 경우, 동영상 파일을 업로드하면 사용자가 직접 동영상에 대한 썸네일을 제작하여 업로드해야 했습니다.<br/><br/>
이 경우 사용자 입장에서 번거롭고, 썸네일 파일의 이름을 잘못 업로드 하는경우 동영상에 접근이 불가했습니다.<br/><br/>
사용자의 편의성을 고려하여 동영상 업로드 시 자동으로 해당 동영상에 대한 썸네일 이미지 파일을 생성하는 기능을 추가했습니다.<br/><br/>
프론트에서 동영상 업로드 요청이 들어오면, 백엔드에서 썸네일 파일도 함께 생성하여 서버 디렉토리에 적재합니다. <br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/136308168-e47c7ad2-6fea-4f43-964f-f8bddff1a061.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/136308366-6af639cf-4bf0-40be-aef3-07f2da37e322.png" width="48%"/>
<br/><br/><br/><br/>
## ☝Revoke Blob Url
메모리 누수 현상이 발생하여 확인해본 결과 blob url이 더 이상 참조하지 않아도 메모리에 할당되어 있는 것을 확인했습니다.<br/><br/>
따라서 React 함수형 컴포넌트에서 생명주기상 componentWillUnmout 함수가 실행되는 useEffect안에 return문에서<br/><br/>
컴포넌트가 사라질 때 blob url을 메모리에서 해제시켜 메모리 누수를 방지했습니다.<br/><br/>
<br/><br/><br/><br/>
## ☝Unsuitable Extension
적합하지 않은 확장자의 파일이 존재하는 경우 파일 이름을 보여주고, 클릭 시 삭제, 다운로드 기능만 사용할 수 있습니다.<br/><br/>
<img src = "https://user-images.githubusercontent.com/60428537/138204710-d7b8d14d-d9fb-4d4e-b0e4-4a8f6838cc5f.png" width="48%"/>  <img src = "https://user-images.githubusercontent.com/60428537/138204774-f7a141e6-14e4-4fcf-b1fb-4a321e21cbce.png" width="48%"/>
<img src = "https://user-images.githubusercontent.com/60428537/138204847-13a7cc47-e751-4b58-938e-ae406e22ab33.png" width="100%"/>
<br/><br/><br/><br/>
