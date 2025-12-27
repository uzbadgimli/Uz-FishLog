(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[730],{737:()=>{},9730:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u});var n=t(5155),o=t(2115),a=t(9722),c=t.n(a);function u({isDarkMode:e,onLocationSelect:r,mapClickedLocation:t}){let a=(0,o.useRef)(null),u=(0,o.useRef)(null),i=(0,o.useRef)(null);return(0,o.useEffect)(()=>{if(!a.current||u.current)return;let t=c().map(a.current).setView([41,29],7);return u.current=t,c().tileLayer(e?"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png":"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors",maxZoom:18}).addTo(t),t.on("click",e=>{let{lat:n,lng:o}=e.latlng;i.current&&t.removeLayer(i.current);let a=c().divIcon({className:"custom-marker",html:`<div style="
          background: #1E40AF;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>`,iconSize:[30,30],iconAnchor:[15,30]});i.current=c().marker([n,o],{icon:a}).addTo(t),r&&r(n,o)}),()=>{u.current&&(u.current.remove(),u.current=null)}},[]),(0,o.useEffect)(()=>{u.current&&(u.current.eachLayer(e=>{e instanceof c().TileLayer&&u.current.removeLayer(e)}),c().tileLayer(e?"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png":"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors",maxZoom:18}).addTo(u.current))},[e]),(0,o.useEffect)(()=>{if(!u.current||!t)return;i.current&&u.current.removeLayer(i.current);let e=c().divIcon({className:"custom-marker",html:`<div style="
        background: #1E40AF;
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      "></div>`,iconSize:[30,30],iconAnchor:[15,30]});i.current=c().marker([t.lat,t.lon],{icon:e}).addTo(u.current)},[t]),(0,n.jsx)("div",{ref:a,style:{width:"100%",height:"100%",minHeight:"300px"}})}t(737)}}]);