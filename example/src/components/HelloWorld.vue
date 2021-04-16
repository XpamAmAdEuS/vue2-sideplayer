<template>
  <div>
    <b-container>
      <b-col>
        <b-row>
          <b-table
              ref="adminmusictable"
              show-empty
              class="mb-0"
              :fields="fields"
              :items="items"
              small
              size="sm"
              responsive="sm"
              :tbody-transition-props="transProps"
          >
            <template #cell(duration)="row">
              {{ (row.item.duration * 1000) }}
            </template>

            <template #cell(imported)="row">
              {{ row.item.imported }}
            </template>

            <template #cell(playactions)="row">
              <b-button
                  v-if="state.musicHash === row.item.hash && state.playing"
                  size="sm"
                  class="mr-1"
                  variant="warning"
                  @click.stop="pauseme(row.item, row)"
              >
                <font-awesome-icon icon="pause"></font-awesome-icon>
              </b-button>
              <b-button
                  v-if="state.musicHash === row.item.hash && !state.playing"
                  size="sm"
                  class="mr-1"
                  variant="outline-success"
                  @click.stop="pauseme(row.item, row)"
              >
                <font-awesome-icon icon="play"></font-awesome-icon>
              </b-button>

              <b-button
                  v-if="row.item.hash !== state.musicHash"
                  size="sm"
                  class="mr-1"
                  variant="success"
                  @click.stop="playRow(row)"
              >
                <font-awesome-icon icon="play"></font-awesome-icon>
              </b-button>
            </template>

          </b-table>
        </b-row>
      </b-col>
    </b-container>

    <side-player
        :auth-token="authToken"
        responsive
        :bar-height="1.2"
        cursor-color="#933232FF"
        :cursor-width="2"
        wave-color="#A8DBA8"
        progress-color="#3B8686"
        prev
        next
    ></side-player>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, inject, reactive, computed} from '@vue/composition-api'
import {
  BFormGroup,
    BContainer,
  BFormCheckbox,
  BPagination,
  BFormSelect,
  BTable,
  BButton,
  BCol,
  BRow,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BCardBody,
} from 'bootstrap-vue';
import SidePlayer from '../../../src/SidePlayer.vue'
export default defineComponent({
  name: 'HelloWorld',
  components:{
    BFormGroup,
    BFormCheckbox,
    BContainer,
    BPagination,
    BFormSelect,
    BTable,
    BButton,
    BCol,
    BRow,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BCardBody,
    SidePlayer
  },
  setup: () => {

    const emitter =  inject('emitter');
    const authToken = 'hfafdsfds'

    emitter.on('sideplaying', data => {
      state.musicHash = data.hash;
      state.playing = true;
      state.stopped = false;
      state.paused = false;
    });

    emitter.on('sidestop', data => {
      state.musicHash = data.hash;
      state.playing = false;
      state.stopped = true;
      state.paused = false;
    });
    emitter.on('sidepause', data => {
      state.musicHash = data.hash;
      state.playing = false;
      state.stopped = false;
      state.paused = true;
    });

    emitter.on('sidefinish', pos => {
      const next = pos + 1;
      playRowId(adminmusictable.value.localItems[next], next);
    });


    emitter.on('sideprev', pos => {
      const next = pos - 1;
      playRowId(adminmusictable.value.localItems[next], next);
    });

    emitter.on('sidenext', pos => {
      const next = pos + 1;
      playRowId(adminmusictable.value.localItems[next], next);
    });

    const playRowId = (row: any, ind: Number): void => {
      state.musicHash = row.hash;
      state.playing = false;
      state.stopped = false;
      state.paused = true;
      state.audio.artist = row.artist;
      state.audio.title = row.title;
      emitter.emit('loadNext', {
        link:  'public/' + row.hash,
        index: ind,
        hash: row.hash,
        title: row.title,
        artist: row.artist,
      });
    };

    const playRow = (row: any): void => {
      state.musicHash = row.item.hash;
      state.playing = false;
      state.stopped = false;
      state.paused = true;
      state.audio.artist = row.item.artist;
      state.audio.title = row.item.title;
      emitter.emit('loadMusic', {
        link: 'public/' + row.item.hash,
        // hash: row.item.hash,
        // audio: { artist: row.item.artist, title: row.item.title },
        row: row,
      });
    };

    const adminmusictable = ref(null);

    const state = reactive({
      musicTypesOptions: [],
      totalRows: 10,
      musicHash: null,
      playing: false,
      stopped: false,
      paused: false,
      audio: {
        title: '',
        artist: '',
      },
    });


    const fields = [
      { key: 'playactions', label: 'Play', sortable: false },
      { key: 'artist', label: 'Artist', sortable: true, name: 'artist' },
      {
        key: 'title',
        label: 'Title',
        sortable: true,
        name: 'title',
      },
      { key: 'album', label: 'Album', sortable: true, name: 'album' },
      { key: 'genre', label: 'Genre', sortable: true, name: 'genre' },
      {
        key: 'duration',
        label: 'Duration',
        sortable: true,
        name: 'duration',
        'sort-by': 'duration',
      },
      {
        key: 'imported',
        label: 'Imported',
        sortable: true,
        name: 'imported',
        'sort-by': 'imported',
      },
      { key: 'musicType.name', label: 'Type', sortable: true, name: 'musicType.name' },
      { key: 'hash', label: 'Hash', sortable: true, name: 'hash' },
      {
        key: 'detail',
        label: 'Detail',
        sortable: false,
        name: 'title',
      },
      { key: 'enabled', label: 'E/D?', sortable: true, name: 'enabled' },
    ];

    const transProps = {
      // Transition name
      name: 'flip-list',
    };


    // eslint-disable-next-line no-unused-vars
    const playme = (item, row) => {
      state.musicHash = item.hash;
      state.playing = false;
      state.stopped = false;
      state.paused = true;
      state.audio.artist = item.artist;
      state.audio.title = item.title;
      emitter.emit('loadMusic', {
        link:  'public/' + item.hash,
        hash: item.hash,
        audio: { artist: item.artist, title: item.title },
        item: item,
        row: row,
      });
    };

    const pauseme = () => {
      state.playing = false;
      state.stopped = false;
      state.paused = true;
      emitter.emit('musicToggle');
    };

    const items = [
      {
        "id": 1307,
        "filepath": "2a1128e4.mp3",
        "hash": "2a1128e4.mp3",
        "artist": "David Guetta Feat Usher",
        "title": "Without You",
        "genre": "Dance_Chart",
        "enabled": true,
        "duration": 207,
        "album": "Dance_Chart",
        "musicTypeId": 1251,
        "musicType": {
          "id": 1251,
          "value": null,
          "name": "Test",
          "size": null,
          "filecount": null,
          "totalduration": null,
          "text": null,
          "updatedOn": null,
          "updatedBy": null
        },
        "filesize": 3304838,
        "imported": null,
        "rating": null,
        "playCount": 0
      },
      {
        "id": 1314,
        "filepath": "2ab8a58d.mp3",
        "hash": "2ab8a58d.mp3",
        "artist": "Dido",
        "title": "Take You Home (Joe Stone Remix)",
        "genre": "Dance_Chart",
        "enabled": true,
        "duration": 277,
        "album": "Dance_Chart",
        "musicTypeId": 1251,
        "musicType": {
          "id": 1251,
          "value": null,
          "name": "Test",
          "size": null,
          "filecount": null,
          "totalduration": null,
          "text": null,
          "updatedOn": null,
          "updatedBy": null
        },
        "filesize": 4422069,
        "imported": null,
        "rating": null,
        "playCount": 0
      },
      {
        "id": 1318,
        "filepath": "1ed30fa9.mp3",
        "hash": "1ed30fa9.mp3",
        "artist": "Jazzamor",
        "title": "Sunrise",
        "genre": "Private_Lounge",
        "enabled": true,
        "duration": 221,
        "album": "Private_Lounge",
        "musicTypeId": 1251,
        "musicType": {
          "id": 1251,
          "value": null,
          "name": "Test",
          "size": null,
          "filecount": null,
          "totalduration": null,
          "text": null,
          "updatedOn": null,
          "updatedBy": null
        },
        "filesize": 3536925,
        "imported": null,
        "rating": null,
        "playCount": 0
      },
      {
        "id": 1305,
        "filepath": "1dc9a21b.mp3",
        "hash": "1dc9a21b.mp3",
        "artist": "Dombresky",
        "title": "Soul Sacrifice",
        "genre": "Dance_Chart",
        "enabled": true,
        "duration": 230,
        "album": "Dance_Chart",
        "musicTypeId": 1251,
        "musicType": {
          "id": 1251,
          "value": null,
          "name": "Test",
          "size": null,
          "filecount": null,
          "totalduration": null,
          "text": null,
          "updatedOn": null,
          "updatedBy": null
        },
        "filesize": 3676247,
        "imported": null,
        "rating": null,
        "playCount": 0
      },
    ]


    return { authToken,
      adminmusictable,
      state,
      fields,
      transProps,
      playme,
      pauseme,
      playRow,
      items}
  }
})
</script>
