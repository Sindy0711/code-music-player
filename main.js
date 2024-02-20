$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const player = $('.player');
const heading = $('.song-heading');
const author = $('.song-artist');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const playSongName = $('.play-song-name');
const playSongAvt = $('.play-avt');
const playSongArtist = $('.play-song-artists');
const volumeProgress = $('.volume-amount');
const volume = $('.volume-amount');
const mute = $('#mute');
const unmute = $('#unmute');




const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Từng quen',
            singer: 'Wren Evans',
            path: './assets/music/TungQuen.mp3',
            image: './assets/img/tungquen.jpg',
            lyrics: '',
        }, {
            name: '3107',
            singer: 'WN',
            path: './assets/music/Id072019-WN.mp3',
            image: './assets/img/3107jpg.jpg',
            lyrics: '',
        }, {
            name: 'Chuyện đôi ta',
            singer: 'Da LAB',
            path: './assets/music/ChuyenDoiTa-EmceeLDaLAB-7120974.mp3',
            image: './assets/img/chuyendoita.jpg',
            lyrics: '',
        }, {
            name: 'Dự báo thời tiết hôm nay mưa',
            singer: 'GREY D',
            path: './assets/music/DuBaoThoiTietHomNayMua-GREYD-8255553.mp3',
            image: './assets/img/dubaothoitiethomnaymua.jpg',
            lyrics: '',
        }, {
            name: 'Hoa Nở Không Màu',
            singer: 'Hoài Lâm',
            path: './assets/music/HoaNoKhongMau1-HoaiLam-6281704.mp3',
            image: './assets/img/hoanokhongmau.jpg',
            lyrics: '',
        }, {
            name: 'Khó Vẽ Nụ Cười',
            singer: 'Đạt G , Du Uyen',
            path: './assets/music/KhoVeNuCuoi-DatGDuUyen-6114344.mp3',
            image: './assets/img/khovenucuoi.jpg',
            lyrics: '',
        },
        {
            name: 'Rồi ta sẽ ngắm pháo hoa cùng nhau',
            singer: 'O.lew',
            path: './assets/music/RoiTaSeNgamPhaoHoaCungNhau-OlewVietNam-8485329.mp3',
            image: './assets/img/roitasengamphaohoacungnhau.jpg',
            lyrics: '',
        },
        {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        },
        {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        }, {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        }, {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        }, {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        },

    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
            <div class="song col-4">
                <div class="song-cover">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title text-white">${song.name}</h3>
                        <p class="author text-white">${song.singer}</p>
                    </div>
                </div>
            </div>
            `
        })
        $('.otherList .row').innerHTML = htmls.join('\n');


    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function () {
        const _this = this;

        //  Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();


        // Xử lí phóng to thu nhỏ CD 
        // document.onscroll = () => {
        //     const scrolltop = window.scrollY || document.documentElement.scrollTop;
        //     const newCdWidth = cdWidth - scrolltop;

        //     cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        //     cd.style.opacity = newCdWidth / cdWidth;

        // }

        // Xử lý khi play

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

        }

        // Khi song được play 
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();

        }

        // Khi song được pause 
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause()
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            };
        }


        // Xử lý khi tua 
        progress.onchange = function (e) {
            const seektime = audio.duration / 100 * e.target.value;
            audio.currentTime = seektime;
        }

        // Khi next song
        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
        }

        // khi pre song
        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
        }

        // khi random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
            _this.PlayRandomSong();
            audio.play();
        }

        volume.oninput = function () {
            let sliderValue = volume.value;
            volume.style.background = `linear-gradient(to right, var(--color-theme) ${sliderValue}%, #4d4d4d ${sliderValue}%)`;
        }

        mute.onclick = function () {
            audio.volume = 0;
            $('.playbar__volumne').classList.add('mute');
            volumeProgress.value = 0;
            volumeProgress.style.background = `linear-gradient(to right, var(--color-theme) ${0}%, #4d4d4d ${0}%)`;
        }

        unmute.onclick = function () {
            audio.volume = _this.volumeAmount;
            $('.playbar__volumne').classList.remove('mute');
            volumeProgress.value = _this.volumeAmount * 100;
            volumeProgress.style.background = `linear-gradient(to right, var(--color-theme) ${_this.volumeAmount * 100}%, #4d4d4d ${_this.volumeAmount * 100}%)`;
        }

        volumeProgress.onchange = function () {

            audio.volume = volumeProgress.value / 100;

            if (volumeProgress.value == 0) {
                if (!$('.playbar-volume').classList.contains('mute')) {
                    $('.playbar-volume').classList.add('mute');
                }
            }
            else {
                _this.volumeAmount = volumeProgress.value / 100;
                if ($('.playbar-volume').classList.contains('mute')) {
                    $('.playbar-volume').classList.remove('mute');
                }
            }
        }



    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        author.textContent = this.currentSong.singer;

        audio.src = this.currentSong.path;

        playSongName.textContent = this.currentSong.name;
        playSongAvt.style.backgroundImage = `url('${this.currentSong.image}')`;
        playSongArtist.textContent = this.currentSong.singer;



    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    PlayRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);

        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },



    start: function () {
        // Định nghĩa thuộc tính cho object
        this.defineProperties();

        // Lắng nghe / xử lý event
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();

        // Render Playlist
        this.render();
    }
}
app.start()


