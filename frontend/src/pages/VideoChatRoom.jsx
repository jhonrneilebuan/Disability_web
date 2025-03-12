import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "react";
import { authStore } from "../stores/authStore";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoChatRoom() {
  const { user } = authStore();
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    const appID = 961138036;
    const serverSecret = "17dc13deb2ba1ccb3b2987977f2d5a18";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      user?.fullName || "Guest"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
