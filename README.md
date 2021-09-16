# ICTInternship-FileViewer(React + Spring)
### ICT Internship(2021) file viewer website front-end & back-end
***
# File Viewer Website
<br/>
해당 프로젝트는 디자인 팀의 요청사항으로 서버 안에 저장된 각종 이미지, 영상 소스들을 쉽게 볼 수 있고, 다운받을 수 있는 웹사이트를 개발하는 프로젝트입니다.
<br/>
선택한 메뉴에 따라 선택한 메뉴에 일치하는 서버 디렉토리 내에 있는 모든 이미지파일, 영상파일을 썸네일 형식으로 보여주고, 클릭 시 해당 파일을 자세히 보여주고, 다운받을 수 있습니다.
<br/>
***
# 프로젝트 기능
<br/>
#### 🔑Login
<br/>
해당 사이트를 사용하는 집단간의 공유하는 아이디와 패스워드만 있으면 되기 때문에 회원가입은 구현하지 않았습니다.<br/>
서버에 적재된 아이디, 비밀번호와 일치하면 로그인을 수행합니다.<br/>
로그인 시 세션을 통하여 본문으로 이동할 수 있는 권한을 부여 받습니다.<br/>
세션이 없으면 모든 URL 접근을 Login으로 이동하므로, 로그인을 성공하여야 본문으로 이동할 수 있습니다.<br/>
<br/>
<img src = "https://user-images.githubusercontent.com/60428537/133401063-79e6a74e-34f3-4b44-9028-67b2959e045f.PNG" width="960px" height="540x"/>
<br/>

#### 🏠Home
<br/>
header 부분 로고와 Home 버튼을 클릭하여 Home으로 이동할 수 있습니다.<br/>
Logout 버튼을 통하여 권한 세션을 없앤 뒤, 로그인 화면으로 이동합니다.<br/>
body에서는 유의사항을 알려주고, 메뉴를 통하여 원하는 디렉토리로 이동합니다.<br/>
<br/>
<img src = "https://user-images.githubusercontent.com/60428537/133565411-174f5022-6dc6-465c-ac2b-d4daf627ad98.PNG" width="960px" height="540px"/>
<br/>

#### 📁Storage
<br/>
저장소에서는 썸네일을 통해 해당 메뉴의 서버 디렉토리에 적재된 사진 및 영상 파일들을 보여줍니다.<br/>
배경이 흰색인 소스와 투명인 소스를 구분하기 위하여 이미지 뒤에 투명을 표시하는 background-image를 넣었습니다.<br/>
영상의 경우, 썸네일 위에 재생이 가능한 영상임을 표시하기 위해 재생 아이콘을 넣었습니다.<br/>
<br/>
<img src = "https://user-images.githubusercontent.com/60428537/133565478-c98eeb25-ff7b-4bbe-ac00-fec2246e69ae.PNG" width="960px" height="540px"/>
<br/>

#### 🔎Detail View
<br/>
썸네일을 클릭하면 해당 이미지, 영상을 자세히볼 수 있고 다운로드도 받을 수 있는 모달 창을 띄웁니다.<br/>
과도하게 큰 이미지, 영상을 방지하기 위하여 최대 너비, 높이보다 큰 이미지의 경우 이미지 가로세로 비율에 맞게 줄여서 나타냅니다.<br/>
나머지 이미지, 영상은 소스의 크기를 파악하기 위하여 원본 픽셀로 나타내며 X 버튼을 클릭하여 모달창을 닫을 수 있습니다.<br/>
<br/>
<img src = "https://user-images.githubusercontent.com/60428537/133565676-e8aa580e-f1c0-45a9-98a3-dba7323ace45.PNG" width="480px" height="270px"/>
<img src = "https://user-images.githubusercontent.com/60428537/133565759-d9ba7f83-b2f7-493d-b9ab-bbafaec572d2.PNG" width="480px" height="270px"/>
<br/>

#### 🎨Change Background
<br/>
배경색과 이미지, 영상 소스의 색상이 비슷하여 식별이 힘든 상황을 방지하기 위하여 배경 색상을 변경할 수 있는 기능입니다.<br/>
상단 3가지 버튼을 통하여 투명한 회색, 흰색, 검은색의 바탕으로 이미지, 영상을 열람할 수 있습니다.<br/>
<br/>
<img src = "https://user-images.githubusercontent.com/60428537/133565831-451d7fa1-8697-4fdf-8ef6-72e90b19e3c1.PNG" width="320px" height="180px"/>
<img src = "https://user-images.githubusercontent.com/60428537/133565907-5f0ecdbb-97ce-4519-96ef-b5044524348e.PNG" width="320px" height="180px"/>
<img src = "https://user-images.githubusercontent.com/60428537/133566009-5caa8fa0-1392-4b68-a3bd-44fea54cb57e.PNG" width="320px" height="180px"/>
<br/>
