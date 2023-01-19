import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

const API = lazy(
  () =>
    import(
      /* webpackChunkName: "API" */ "../API/API"
    )
);

const Documents = lazy(
  () =>
    import(
      /* webpackChunkName: "Notes" */ "../Documents/Documents"
    )
);

const Note = lazy(
  () =>
    import(
      /* webpackChunkName: "Note" */ "../Documents/Notes/Note"
    )
);

const NewNote = lazy(
  () =>
    import(
      /* webpackChunkName: "NewNote" */ "../Documents/Notes/NewNote"
    )
);

const User = lazy(
  () =>
    import(
      /* webpackChunkName: "User" */ "../Users/User/User"
    )
);

const WebHook = lazy(
  () =>
    import(
      /* webpackChunkName: "WebHook" */ "../WebHooks/WebHook/WebHook"
    )
);

const WebHooks = lazy(
  () =>
    import(
      /* webpackChunkName: "WebHooks" */ "../WebHooks/WebHooks"
    )
);

const Server = lazy(
  () =>
    import(
      /* webpackChunkName: "Server" */ "../Server/MqttServer/MqttServer"
    )
);

const Adapter = lazy(
  () =>
    import(
      /* webpackChunkName: "Adapter" */ "../Adapter/Adapter"
    )
);

const Monitor = lazy(
  () =>
    import(
      /* webpackChunkName: "Monitor" */ "../Monitor/Monitor"
    )
);

const Analytics = lazy(
  () =>
    import(
      /* webpackChunkName: "Analytics" */ "../Analytics/Analytics"
    )
);

const Alarms = lazy(
  () =>
    import(
      /* webpackChunkName: "Alarms" */ "../Alarms/Alarms"
    )
);

const Users = lazy(
  () =>
    import(
      /* webpackChunkName: "Users" */ "../Users/Users"
    )
);

const Info = lazy(
    () =>
      import(
        /* webpackChunkName: "Info" */ "../Info/Info"
      )
  );

const System = lazy(
  () =>
    import(
      /* webpackChunkName: "Settings" */ "../System/SystemView"
    )
);

const Connections = lazy(
  () =>
    import(
      /* webpackChunkName: "Connections" */ "../Connections/Connections"
    )
);

export default function Body(){
    return <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/Monitor/" element={<Monitor/>} />
          <Route path="/Monitor/Server/Mqtt/:id/*" element={<Server/>} />
          <Route path="/Monitor/Server/Opc/:id/*" element={<Server/>} />
          <Route path="/Monitor/Adapter/:id/*" element={<Adapter/>} />
          <Route path="/WebHooks/" element={<WebHooks/>} />
          <Route path="/WebHooks/Hook/:id/*" element={<WebHook/>} />
          <Route path="/Documents/" element={<Documents/>} />
          <Route path="/Documents/Notes/Note/:id/*" element={<Note/>} />
          <Route path="/Documents/Notes/New/*" element={<NewNote/>} />
          <Route path="/API/*" element={<API/>} />
          <Route path="/Users/" element={<Users/>} />
          <Route path="/Users/User/:id/*" element={<User/>} />
          <Route path="/Analytics/*" element={<Analytics/>} />  
          <Route path="/Alarms/*" element={<Alarms/>} />
          <Route path="/Users/*" element={<Users/>} />
          <Route path="/Info/*" element={<Info/>} />
          <Route path="/System/*" element={<System/>} />
          <Route path="/Connections/*" element={<Connections/>} />
          <Route path="/*" element={<Navigate to={"/Monitor"}/>} />
        </Routes>
      </Suspense>
    </>
}
