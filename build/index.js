'use strict';

System.register(['rodin/core', './VPcontrolPanel.js'], function (_export, _context) {
   "use strict";

   var RODIN, VPcontrolPanel, player, material, sphere, controlPanel;
   return {
      setters: [function (_rodinCore) {
         RODIN = _rodinCore;
      }, function (_VPcontrolPanelJs) {
         VPcontrolPanel = _VPcontrolPanelJs.VPcontrolPanel;
      }],
      execute: function () {
         RODIN.start();

         player = new RODIN.MaterialPlayer({
            HD: "https://cdn.rodin.io/resources/video/PedraBonita1k.mp4",
            SD: "https://cdn.rodin.io/resources/video/PedraBonita1k.mp4",
            default: "HD"
         });
         material = new THREE.MeshBasicMaterial({
            map: player.getTexture()
         });
         sphere = new RODIN.Sculpt(new THREE.Mesh(new THREE.SphereBufferGeometry(90, 720, 4), material));

         sphere.scale.set(1, 1, -1);
         sphere.rotation.y = Math.PI / 2;
         RODIN.Scene.add(sphere);

         RODIN.Scene.preRender(function () {
            player.update(RODIN.Time.delta);
         });

         controlPanel = new VPcontrolPanel({
            player: player,
            title: "A sample 360° video",
            cover: "img/rodin.jpg",
            distance: 2,
            width: 3
         });


         controlPanel.on(RODIN.CONST.READY, function (evt) {
            RODIN.Scene.add(evt.target);
            evt.target.position.y = 1.6;

            if (evt.target.coverEl) {
               evt.target.coverEl.rotation.y = -Math.PI / 2;
            }
            // console.log(evt.target.panel.globalPosition);
         });
      }
   };
});