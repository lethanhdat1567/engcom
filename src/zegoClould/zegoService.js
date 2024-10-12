// services/videoCallService.js
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const appID = 1289352846; // Đặt appID ở đây
const serverSecret = 'ae7a6fd3ce34bb46468e3f0d18c02c36';

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
