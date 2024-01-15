$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');




const app = {
    currentIndex: 0,
    isPlaying: false,
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
            path: './assets/music/3107.mp3',
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
            lyrics: '',e
        },
        {
            name: 'Vài câu nói có khiến người thay đổi',
            singer: 'GREY D',
            path: './assets/music/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLanTlinh-7533673.mp3',
            image: './assets/img/vaicaunoicokhiennguoithaydoi.jpg',
            lyrics: '',
        },
        {
            name: '3107',
            singer: 'WN',
            path: './assets/music/3107.mp3',
            image: './assets/img/3107jpg.jpg',
            lyrics: '',
        },
        {
            name: '3107',
            singer: 'WN',
            path: './assets/music/3107.mp3',
            image: './assets/img/3107jpg.jpg',
            lyrics: '',
        },
    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('\n')
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
        const cdWidth = cd.offsetWidth;


        //  Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        // Xử lí phóng to thu nhỏ CD 
        document.onscroll = () => {
            const scrolltop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrolltop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;

        }

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



    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentSong = 0;
        }
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

function addStyle() {
    $(".modal").setAttribute("style", "display: none;");
}
