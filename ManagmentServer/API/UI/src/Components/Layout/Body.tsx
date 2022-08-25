import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

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

const Settings = lazy(
  () =>
    import(
      /* webpackChunkName: "Settings" */ "../Settings/Settings"
    )
);

export default function Body(){
    return <div className=" p-5 md:p-10 space-y-5">  
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/Monitor/*" element={<Monitor/>} />
          <Route path="/Analytics/*" element={<Analytics/>} />
          <Route path="/Alarms/*" element={<Alarms/>} />
          <Route path="/Users/*" element={<Users/>} />
          <Route path="/Help/*" element={<Help/>} />
          <Route path="/Settings/*" element={<Settings/>} />
          <Route path="/*" element={<Navigate to={"/Monitor"}/>} />
        </Routes>
      </Suspense>
    </div>
}
