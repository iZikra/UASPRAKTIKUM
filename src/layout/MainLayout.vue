<template>
  <q-layout view="lHr lpR lfr">
    <q-header class="bg-sage text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="nav">UAS Praktikum</q-toolbar-title>
        <q-tabs align="center">
          <q-route-tab to="/" label="weather" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-sage text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="foot">
          Copyright © ZIKRALLAH AL HADY 223510666
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup></script>

<style>
.q-toolbar {
  padding: 0 75px !important;
}

.q-tab {
  padding: 0 20px !important;
  min-height: 75px !important;
}
.bg-sage {
  background-color: blue !important;
}
.nav {
  padding-left: 10px !important;
}
.foot {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
