// services/videoCallService.js
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const appID = 1603525138; // Đặt appID ở đây
const serverSecret = '7395a980c060cbfcb493b8f759360052';

export const startCallVideo = (roomID, userName, containerElement) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        userName,
    );

    const zegoUIKit = ZegoUIKitPrebuilt.create(kitToken);

    zegoUIKit.joinRoom({
        container: containerElement,
        scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: false,
        userName: userName,
    });

    return zegoUIKit; // Trả về đối tượng zegoUIKit để quản lý sau này
};
