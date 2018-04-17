const dialogs = require('tns-core-modules/ui/dialogs');
const pushPlugin = require("nativescript-push-notifications");

const pushSettings = {
  senderID: "729158096439", // Required: setting with the sender/project number
  notificationCallbackAndroid: function (stringifiedData, fcmNotification) {
      var notificationBody = fcmNotification && fcmNotification.getBody();
      _this.updateMessage("Message received!\n" + notificationBody + "\n" + stringifiedData);
  }
};
const list = [
  { name: 'Facebook', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
  { name: 'Instagram', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
  { name: 'Google', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
  { name: 'Github', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
];

pushPlugin.register(pushSettings, function (token) {
  alert("Device registered. Access token: " + token);
}, function() { });

module.exports = {
  data() {
    return {
      surprise: false,
      currentPIN: null,
      list: [
        { name: 'Chupiscode', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
        { name: 'SatTrack', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true },
        { name: 'MetaBI', token: 'asd3h34ghd323kskh3h3ht8fdh.r4hyuu4e7wHGHSDF', show: true }
      ]
    };
  },
  methods: {
    generatePIN() {
      this.currentPIN = Math.round(Math.random() * 1000);
    },
    handleItemTap(event) {
      const { index } = event;

      const item = this.list[index];
      const options = ['Deletar', 'Desativar'];
      const that = this;

      dialogs.action(
        item.name,
        'Fechar',
        options
      )
        .then(function handleSelectedItem(selected) {
          const selectedIndex = options.indexOf(selected);

          if (selectedIndex >= 0) {
            console.log('has index!');

            dialogs.confirm('Você tem certeza disso?')
              .then(function handleAction(shouldDelete) {
                console.log('shouldDelete', shouldDelete);

                if (shouldDelete) {
                  console.log('beforeSplice', that.list);

                  that.list.splice(index, index === 0 ? 1 : index);
                }
              })
              .catch(function handleError(err) {
                console.log('ERROR:', err);
              });
          }
        });
    },
    addListItem(item) {
      this.list.push(item);
    },
    handleAddListItem() {
      const lastItem = list[list.length - 1];
      console.log('handleAddListItem', lastItem);
      if (lastItem) {
        console.log('adding item', this.list);

        this.addListItem(lastItem);

        list.pop();
        setTimeout(this.handleAddListItem, 1000);
      }
    }
  },
  mounted() {
    this.handleAddListItem();
  },
  template: `
    <Page class="page">
      <ActionBar
        title="Chupiscode"
        color="#ffffff"
        backgroundColor="#027be3"
        class="action-bar"
      />
  
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
          @itemTap="handleItemTap"
        >
          <v-template>
            <Label
              :text="item.name"
              padding="16"
            />
          </v-template>
        </ListView>
      </StackLayout>
    </Page>
  `
};

/*
<Button class="btn btn-primary" @tap="surprise = !surprise" text="Tap me!"/>
<Image v-if="surprise" class="m-20" src="~/images/NativeScript-Vue.png"/>
<Button class="btn btn-secondary" text="Gerar PIN" @tap="generatePIN" />
<Button class="btn btn-tertiary" text="Gerar Alerta" @tap="alert" />
<Label v-if="currentPIN" style="font-size: 30;" textWrap=true :text="currentPIN"/>
*/