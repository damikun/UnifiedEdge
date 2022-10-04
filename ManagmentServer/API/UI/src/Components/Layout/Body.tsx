import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

const Servers = lazy(
  () =>
    import(
      /* webpackChunkName: "Servers" */ "../Servers/Servers"
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

const Help = lazy(
    () =>
      import(
        /* webpackChunkName: "Help" */ "../Help/Help"
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
    return <div className="p-5 md:p-10 space-y-5">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/Monitor/" element={<Monitor/>} />
          <Route path="/Monitor/Server/Mqtt/:id/*" element={<Server/>} />
          <Route path="/Monitor/Server/Opc/:id/*" element={<Server/>} />
          <Route path="/Servers/*" element={<Servers/>} />
          <Route path="/Monitor/Adapter/:id/*" element={<Adapter/>} />
          <Route path="/Analytics/*" element={<Analytics/>} />  
          <Route path="/Alarms/*" element={<Alarms/>} />
          <Route path="/Users/*" element={<Users/>} />
          <Route path="/Help/*" element={<Help/>} />
          <Route path="/System/*" element={<System/>} />
          <Route path="/Connections/*" element={<Connections/>} />
          <Route path="/*" element={<Navigate to={"/Monitor"}/>} />
        </Routes>
      </Suspense>
    </div>
}
