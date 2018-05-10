import Vue from 'nativescript-vue';
import router from './router';
import axios from 'axios';
require("nativescript-dom")
const http = require('http');
const audio = require('nativescript-audio');
const player = new audio.TNSPlayer();
const fileSystemModule = require("tns-core-modules/file-system");
import './styles.scss';
let setCategoryRes = AVAudioSession.sharedInstance().setCategoryWithOptionsError(AVAudioSessionCategoryPlayAndRecord, AVAudioSessionCategoryOptions.DefaultToSpeaker);

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;
Vue.use(axios);
new Vue({
    router,
    data() {
        return {
            tracklist: [],
            tracklist1: [],
            tracklist2: [],
            tracklist3: [],
            src: 'http://muzzov.net/uploads/files/2017-12/1512463667_loboda-paren-www_muzonov_net.mp3',
            searchlist: [],
            inp: '',
            loadingg: true,
            layo: false,
            genres: [],
            pausee: '17'
        }
    },
    mounted() {
        this.loadingg = true;
        http.getJSON('https://node-redchilik.c9users.io/tracks')
            .then((res) => {
                this.loadingg = false;
                this.tracklist = res;

            });
        axios.get('https://node-redchilik.c9users.io/navigation')
            .then((res) => {
                this.genres = res.data;
            })
        axios.post('https://node-redchilik.c9users.io/switchgenre', JSON.stringify("rep"))
            .then(res => {
                this.loadingg = false;
                this.tracklist1 = res.data;
            });
        axios.post('https://node-redchilik.c9users.io/switchgenre', JSON.stringify("rok"))
            .then(res => {
                this.loadingg = false;
                this.tracklist2 = res.data;
            });
        axios.post('https://node-redchilik.c9users.io/switchgenre', JSON.stringify("pop"))
            .then(res => {
                this.loadingg = false;
                this.tracklist3 = res.data;
            })



    },

    methods: {
        playSound(eventData) {

            console.log(eventData.object.datasrc);
            player.dispose()
            this.src = eventData.object.datasrc;
            player
                .playFromUrl({
                    audioFile: this.src,
                    loop: true,
                    completeCallback: function() {
                        console.log(' finished playing');
                    }
                })
                .then(function(res) {

                })
                .catch(function(err) {
                    console.log('something went wrong...', err);
                })
            router.push('/helloworld')




        },
        onSubmit(eventData) {
            this.loadingg = true;
            let inp = eventData.object.text;
            axios.post('https://node-redchilik.c9users.io/search', JSON.stringify(inp))
                .then((res) => {
                    this.loadingg = false;
                    this.searchlist = res.data

                })
        },
        switchGenre(eventData) {
            let genre = eventData.object.link;
            console.log(genre);
            if (genre == undefined) {
                switch (eventData.object.selectedIndex) {
                    case 0:
                        genre = ''
                        break;
                    case 1:
                        genre = 'new'
                        break;
                    case 2:
                        genre = 'house'
                        break;

                }


            }
            this.tracklist = [];
            setTimeout(() => { this.layo = false }, 100);
            this.loadingg = true;
            var inp = JSON.stringify(genre);
            axios.post('https://node-redchilik.c9users.io/switchgenre', inp)
                .then(res => {
                    this.loadingg = false;
                    this.tracklist = res.data
                })


        },
        playPause(eventData) {
            player
                .isAudioPlaying() ? player.pause() : player.resume();
            setTimeout(() => { eventData.object.ios.systemIcon = '17' }, 400)
            console.log(eventData.object.ios.systemIcon)

        }




    },



    template: `
        <Page class="page">
        <ActionBar title="Дом" class="action-bar" @tap="$router.push('/home')">
<ActionItem @tap="playPause" ios.systemIcon="18" ios.position="right" android.systemIcon="ic_menu_search"></ActionItem>

        </ActionBar>
        
        <TabView selectedTabTextColor="#FFFFFF" tabBackgroundColor="#333333">




        <TabViewItem title="Дом" iconSource="~/images/home13.png">
        
        <StackLayout>
        <SegmentedBar selectedBackgroundColor="white" @selectedIndexChange="switchGenre">
        <SegmentedBarItem title="TOP 100" @selectedIndexChange="switchGenre" link="top100.html" />
        <SegmentedBarItem title="Новинки" @selectedIndexChange="switchGenre" link="new" />
        <SegmentedBarItem title="House" @selectedIndexChange="switchGenre" link="house" />
        </SegmentedBar>
        
        
        
        <StackLayout v-if="layo">
        <ScrollView>
        
        
        
        <FlexboxLayout alignItems="center" flexDirection="column">
        <Label fontSize="25" @tap="switchGenre" textAlignment="center" borderColor="#444444" padding="5" color="white" marginTop="5" v-for='genree in genres' :text="genree.genre" :link="genree.link" />
        </FlexboxLayout>
        
        
        </ScrollView>
        </StackLayout>
        
        
        
            <StackLayout marginTop="50%" v-if="loadingg">
                <ActivityIndicator busy="true" color="white" @busyChange="onBusyChanged" />
            </StackLayout>
        
        <ScrollView>
        
        <StackLayout>



        <Label text="Топ 100" margin="20" horizontalAlignment="center" color="white" fontSize="20"/>

    <ScrollView orientation="horizontal">
        <FlexboxLayout flexDirection="row" justifyContent="space-around">
        
        <StackLayout class="block" v-for="track in tracklist">
        <Label class="background" :backgroundImage="track.background" :datasrc="track.src" @tap="playSound" />
        <Label class="song" :text="track.song" />
        <Label class="signer" :text="track.signer" />
        </StackLayout>

        </FlexboxLayout>
</ScrollView>

<Label text="HIP-HOP" margin="20" horizontalAlignment="center" color="white" fontSize="20"/>
<FlexboxLayout flexWrap="wrap" justifyContent="space-around">
        <FlexboxLayout class="block list" v-for="track in tracklist1.slice(0,5)" flexDirection="row">
        <Label class="background" :backgroundImage="track.background" :datasrc="track.src" @tap="playSound" />
        <FlexboxLayout flexDirection="column" width="80%">
        <Label class="song" :text="track.song" />
        <Label class="signer" :text="track.signer" />
        </FlexboxLayout>
        </FlexboxLayout>
        
        
        
        </FlexboxLayout>



<Label text="ROCKKKK" margin="20" horizontalAlignment="center" color="white" fontSize="20"/>

<ScrollView orientation="horizontal">
    <FlexboxLayout flexDirection="row" justifyContent="space-around">
    
    <StackLayout class="block" v-for="track in tracklist2">
    <Label class="background" :backgroundImage="track.background" :datasrc="track.src" @tap="playSound" />
    <Label class="song" :text="track.song" />
    <Label class="signer" :text="track.signer" />
    </StackLayout>

    </FlexboxLayout>
</ScrollView>



<Label text="Популярная музыка" margin="20" horizontalAlignment="center" color="white" fontSize="20"/>

<ScrollView orientation="horizontal">
    <FlexboxLayout flexDirection="row" justifyContent="space-around">
    
    <StackLayout class="block" v-for="track in tracklist3">
    <Label class="background" :backgroundImage="track.background" :datasrc="track.src" @tap="playSound" />
    <Label class="song" :text="track.song" />
    <Label class="signer" :text="track.signer" />
    </StackLayout>

    </FlexboxLayout>
</ScrollView>



        </StackLayout>
        </ScrollView>


        
        </StackLayout>
        
        </TabViewItem>
        
        
        <TabViewItem title="Плейлист" iconSource="~/images/like13.png">
        
        
        <ScrollView>
        
        </ScrollView>
        
        
        </TabViewItem>
        <TabViewItem title="Поиск" iconSource="~/images/search13.png">
        
        
        
        <StackLayout>
        <SearchBar hint="Search hint" @submit="onSubmit" textFieldBackgroundColor="#333333" />
        <StackLayout marginTop="50%" v-if="loadingg">
        <ActivityIndicator busy="true" color="white" @busyChange="onBusyChanged" />
        </StackLayout>
        <ScrollView>
        <FlexboxLayout flexWrap="wrap" justifyContent="space-around">
        <FlexboxLayout class="block list" v-for="track in searchlist" flexDirection="row">
        <Label class="background" :backgroundImage="track.background" :datasrc="track.src" @tap="playSound" />
        <FlexboxLayout flexDirection="column" width="80%">
        <Label class="song" :text="track.song" />
        <Label class="signer" :text="track.signer" />
        </FlexboxLayout>
        </FlexboxLayout>
        
        
        
        </FlexboxLayout>
        </ScrollView>
        </StackLayout>
        
        
        
        
        </TabViewItem>
        <TabViewItem title="Настройки" iconSource="~/images/settings13.png">
        
        
        <ScrollView>
        
        </ScrollView>
        
        
        </TabViewItem>

        
        </TabView>


        
        </Page>
        `,

}).$start();