<template>
        <Page class="page">
        <ActionBar :title="$route.meta.title" class="action-bar"  @tap='tabshow=!tabshow' >
<ActionItem @tap="playPause" ios.systemIcon="18" ios.position="right" android.systemIcon="ic_menu_search"></ActionItem>

        </ActionBar>

            
<GridLayout>




        <TabView  selectedTabTextColor="#FFFFFF" tabBackgroundColor="#333333">



        <TabViewItem title="Дом" iconSource="~/images/home13.png">
        
        <StackLayout>
        <SegmentedBar selectedBackgroundColor="white" @selectedIndexChange="switchGenre">
        <SegmentedBarItem title="TOP 100" @selectedIndexChange="switchGenre" link="top100.html" />
        <SegmentedBarItem title="Новинки" @selectedIndexChange="switchGenre" link="new" />
        <SegmentedBarItem title="House" @selectedIndexChange="switchGenre" link="house" />
        </SegmentedBar>
        
        

        
        
        
            <StackLayout height="100%" v-if="loadingg">
                <ActivityIndicator marginTop="50%" busy="true" color="white" />
            </StackLayout>
        
        <ScrollView>
        
        <StackLayout>



        <Label width="100%"  textAlignment="center" text="Топ 100"  padding="15" color="white" fontSize="20"/>

    <ScrollView orientation="horizontal">
        <FlexboxLayout flexDirection="row" justifyContent="space-around">
        
        <StackLayout class="block" v-for="track in tracklist">
        <Label class="background" :backgroundImage="track.background" :datasrc="track.src" :datasong="track.song" :datasigner="track.signer" @tap="playSound" />
        <Label :datalink="track.link" @tap="goDescr" class="song" :text="track.song" />
        <Label :datalink="track.link" @tap="goDescr"  class="signer" :text="track.signer" />
        </StackLayout>

        </FlexboxLayout>
</ScrollView>

<Label width="100%" borderWidth="1 0 0 0" textAlignment="center" borderColor="#444444" text="HIP-HOP"  padding="15"   color="white" fontSize="20"/>
<FlexboxLayout flexWrap="wrap" justifyContent="space-around">
        <FlexboxLayout class="block list" v-for="track in tracklist1.slice(0,5)" flexDirection="row">
        <Label class="background" :backgroundImage="track.background" :datasong="track.song" :datasigner="track.signer" :datasrc="track.src" @tap="playSound" />
        <FlexboxLayout flexDirection="column" width="80%">
        <Label class="song" :datalink="track.link" @tap="goDescr"  :text="track.song" />
        <Label class="signer"  :datalink="track.link" @tap="goDescr"  :text="track.signer" />
        </FlexboxLayout>
        </FlexboxLayout>
        
        
        
        </FlexboxLayout>



<Label width="100%"  textAlignment="center"   text="ROCKKKK"  padding="15"   color="white" fontSize="20"/>

<ScrollView orientation="horizontal">
    <FlexboxLayout flexDirection="row" justifyContent="space-around">
    
    <StackLayout class="block" v-for="track in tracklist2">
    <Label class="background" :backgroundImage="track.background" :datasong="track.song" :datasigner="track.signer" :datasrc="track.src" @tap="playSound" />
    <Label :datalink="track.link" @tap="goDescr"  class="song" :text="track.song" />
    <Label :datalink="track.link" @tap="goDescr"  class="signer" :text="track.signer" />
    </StackLayout>

    </FlexboxLayout>
</ScrollView>



<Label width="100%" borderWidth="1 0 0 0" textAlignment="center" borderColor="#444444"  text="Популярная музыка"  padding="15"  color="white" fontSize="20"/>

<ScrollView orientation="horizontal">
    <FlexboxLayout flexDirection="row" justifyContent="space-around">
    
    <StackLayout class="block" v-for="track in tracklist3">
    <Label class="background" :backgroundImage="track.background" :datasong="track.song" :datasigner="track.signer" :datasrc="track.src" @tap="playSound" />
    <Label :datalink="track.link" @tap="goDescr"  class="song" :text="track.song" />
    <Label :datalink="track.link" @tap="goDescr"  class="signer" :text="track.signer" />
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
                    
        
        <StackLayout>
        
        <FlexboxLayout v-if="layo" alignItems="center" flexDirection="column">
        <Label fontSize="25" @tap="switchGenre" textAlignment="center" borderColor="#44444" padding="25" color="white" marginTop="45" v-for='genree in genres' :text="genree.genre" :link="genree.link" />
        </FlexboxLayout>
        
        
        
        <FlexboxLayout flexWrap="wrap" justifyContent="space-around">
        <FlexboxLayout class="block list" v-for="track in searchlist" flexDirection="row">
        <Label class="background" :backgroundImage="track.background" :datasong="track.song" :datasigner="track.signer" :datasrc="track.src" @tap="playSound" />
        <FlexboxLayout flexDirection="column" width="80%">
        <Label :datalink="track.link" @tap="goDescr"  class="song" :text="track.song" />
        <Label :datalink="track.link" @tap="goDescr"  class="signer" :text="track.signer" />
        </FlexboxLayout>
        </FlexboxLayout>
        
        
        
        </FlexboxLayout>
        </StackLayout>
        </ScrollView>
        </StackLayout>
        
        
        
        
        </TabViewItem>
        <TabViewItem title="Настройки" iconSource="~/images/settings13.png">
        
        
        <ScrollView>
        
        </ScrollView>
        
        
        </TabViewItem>

        
        </TabView>



    <StackLayout v-if="tabshow" backgroundColor="#333333" color="white" >
        <FlexboxLayout padding="20" width='100%' flexDirection="column" justifyContent="space-around" alignItems="center">
            
            <Label class='background' :backgroundImage="currBg" height="400px" width="400px" />
            <Label width="50%"  :text="currSong" textAlignment="center" padding="5" />
            <Label width="50%"  :text="currSigner" textAlignment="center" padding="5" />
        
            <Progress :value="currTime" marginTop="5%" />
        <FlexboxLayout width="85%" flexDirection="row" justifyContent="space-between">
            <label  :text="currMin" />
            <label  :text="currDur" />
         </FlexboxLayout>
            <label class="icon" marginTop="5%" @tap="playPause" :text="state" fontWeight="bold" />
            <Slider value="50" @valueChange="changeVol" marginTop="10%" />
        </FlexboxLayout>

    </StackLayout>



        </GridLayout>
        </Page>
</template>






<script>
import axios from 'axios';
const http = require('http');
const audio = require('nativescript-audio');
const player = new audio.TNSPlayer();
const fileSystemModule = require("tns-core-modules/file-system");

export default {
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
            layo: true,
            genres: [],
            pausee: '17',
            tabshow:false,
            currSong:'few',
            currSigner:'seferw',
            currBg:'',
            currTime:'',
            currVol:'',
            currDur:'0:00',
            currMin:'0:00',
            timer:'',
            state:'||'
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
                    axios.get('navigation')
                .then((res) => {
                    this.genres = res.data;
                  

                })



    },

    methods: {
        
        playSound(eventData) {
            clearInterval(this.timer);
            console.log(eventData.object.datasrc);
            player.dispose()
            this.src = eventData.object.datasrc;
            this.currSigner = eventData.object.datasigner;
            this.currSong = eventData.object.datasong;
            this.currBg = eventData.object.backgroundImage;
            console.log(`${this.currSong} ${this.currSigner}`)
            player
                .playFromUrl({
                    audioFile: this.src,
                    loop: true,
                    completeCallback: function() {
                        console.log(' finished playing');
                    }
                })
                .then((res)=> {
player.getAudioTrackDuration()
.then((res)=>{
    
   this.timer = setInterval(()=>{
        this.currTime = player.currentTime * 100 / res
                var min = player.currentTime / 60
                min = min.toString().slice(0, 1);
                var sec = player.currentTime % 60 / 100
                sec = sec.toString().slice(2, 4);
                this.currMin = min + ':' + sec;
                var min = res / 60
                min = min.toString().slice(0, 1);
                var sec = res % 60
                sec = sec.toString().slice(0, 2);
                this.currDur = min + ':' + sec;
        
        
        },1000)

})
.catch((err)=>console.log(err));
                })
                .catch((err)=> {
                    console.log('something went wrong...', err);
                })
            
            




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
                    this.searchlist = res.data
                    this.layo = false;
                })


        },
        playPause(eventData) {
            player
                .isAudioPlaying() ? player.pause() : player.resume();
            player
                .isAudioPlaying() ? this.state="||":this.state = "|>";


        },
        changeVol(eventData){
                player.volume = eventData.object.value / 100;




        },
        goDescr(eventData){
            console.log(eventData.object.datalink);
           this.$router.push(eventData.object.datalink);

        }




    }


}
</script>

