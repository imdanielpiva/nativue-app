<template>
  <Page class="page">
    <ActionBar
      title="iOS Notifications Plugin"
      color="#ffffff"
      backgroundColor="#027be3"
      class="action-bar"
    >
      <ActionItem
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_settings"
        android.position="actionBar"
        @tap="onTapShare"
      />
    </ActionBar>

    <StackLayout>
      <Label
        text="Lista de aplicativos"
        height="70"
        padding="16"
        fontSize="24"
        fontWeight="300"
      />
      <ListView
        for="item in list"
        @itemTap="onItemTap"
      >
        <v-template>
          <Label
            :text="item.name"
            padding="16"
          />
        </v-template>
      </ListView>
    </StackLayout>
    <ActionItem
      ios.systemIcon="16"
      ios.position="right"
      text="Add"
      android.position="popup"
      @tap="sayHi"
      />
  </Page>
</template>

<script>
const dialogs = require('tns-core-modules/ui/dialogs');

export default {
  data: () => ({
    list: [
      { name: 'SatTrack', id: 'abc' },
      { name: 'MetaBI', id: 'acb' },
      { name: 'Chupiscode', id: 'cba' },
    ]
  }),
  methods: {
    onTapShare(event) {
      console.log(event);
    },

    onItemTap(event) {
      dialogs.alert('Item has been clicked')
        .then(console.log);
    },

    sayHi() {
      dialogs.alert('Hi, there!');
    }
  }
};
</script>

