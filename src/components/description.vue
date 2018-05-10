<template>
        <Page class="page">
        <ActionBar :title="$route.meta.title" class="action-bar"  @tap='tabshow=!tabshow' >
<ActionItem @tap="playPause" ios.systemIcon="18" ios.position="right" android.systemIcon="ic_menu_search"></ActionItem>

        </ActionBar>

            
<GridLayout>




        <ScrollView v-if="loade">
        <StackLayout>
            <FlexboxLayout padding="15" color="white" flexDirection="column" alignItems="center">
            <Image width="400px" height="400px" :src="img" />
            <Label width="100%" textWrap="true" textAlignment="center" fontSize="30" fontWeight="bold" marginTop="15" :text="name" />
            <Label textWrap="true" :text="descrSigner"/>
            </FlexboxLayout>



<FlexboxLayout flexWrap="wrap" justifyContent="space-around">
        <FlexboxLayout class="block list" v-for="track in tracklist" flexDirection="row">
        <Label class="background" :backgroundImage="track.background" :datasong="track.song" :datasigner="track.signer" :datasrc="track.src" @tap="playSound" />
        <FlexboxLayout flexDirection="column" width="80%">
        <Label :datalink="track.link" @tap="goDescr"  class="song" :text="track.song" />
        <Label :datalink="track.link" @tap="goDescr"  class="signer" :text="track.signer" />
        </FlexboxLayout>
        </FlexboxLayout>
        
        
        
        </FlexboxLayout>
</StackLayout>
            </ScrollView>



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
            layo: false,
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
            state:'||',
            name:'ergerg',
            img:'ergerg',
            descrSigner:'gerg',
            loade:false
        }
    },
    mounted() {
                    var signer = this.$route.params.id;
            var genre = this.$route.params.genre;
            var inp = JSON.stringify('/' + genre + '/' + signer);
            console.log(inp);
            axios.post('https://node-redchilik.c9users.io/description', inp)
                .then((res) => {

                    this.descrSigner = res.data.descr;
                    this.img = res.data.src
                    this.name = res.data.name
                    console.log(`${res.data.name} ${res.data.src} ${res.data.descr}`)
                    this.loade = true;
                    // this.original = res.data.track;
                    this.tracklist = res.data.tracklist;

                   
                    // this.mes = 'Возможно вас заинтересует'
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
                    this.tracklist = res.data
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




        }




    }


}
</script>

