var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber -1];

    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });

    setVolume(currentVolume);
};

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
}

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var albumGeorgeEzra = {
    title: 'Wanted on Voyage',
    artist: 'George Ezra',
    label: 'Columbia',
    year: '2014',
    albumArtUrl: 'assests/images/Wanted_on_Voyage.jpg',
    songs: [
        { title: 'Barcelona', duration: '3:03' }
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
        '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        '  <td class="song-item-title">' + songName + '</td>'
        '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
        '</tr>'
     ;

    var $row = $(template);

    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if(currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }

    };
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


 var setCurrentAlbum = function(album) {
<<<<<<< HEAD

     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     $albumSongList.empty();

=======
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
     albumSongList.innerHTML = '';

>>>>>>> checkpoint-25-assignment
     for (var i = 0; i < album.songs.length; i++) {
         console.log("The for loop on 78")
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

<<<<<<< HEAD
<<<<<<< HEAD
var setCurrentTimeInPlayerBar = function (currentTime) {
    var $currentTimeElement = $('.seek-control .current-time');
    $currentTimeElement.text(currentTime);
};

var setTotalTimeInPlayerBar = function(totalTime) {
    var $totalTimeElement = $('.seek-control .total-time');
    $totalTimeElement.text(totalTime);
};

var filterTimeCode = function(timeInSeconds) {
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);
    var remainingSeconds = wholeSeconds % 60;

    var output = minutes + ':';
    if (remainingSeconds < 10) {
        output += '0';
    }
    output += '0';
    return output;
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var currentTime = this.getTime();
            var songLength = this.getDuration();
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            updateSeekPercentage($seekBar, seekBarFillRatio);
            setCurrentTimeInPlayerBar(filterTimeCode(currentTime));
        });
    }
};

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }

        updateSeekPercentage($(this), seekBarFillRatio);

    });
    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                setVolume(seekBarFillRatio);
            }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });

        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};
=======
>>>>>>> checkpoint-33-assignment

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentlySongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number"' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number"' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

}

var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}


var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum, $(albumArtist));
    $('.main-controls .play-pause').html(playerBarPauseButton);

    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.length));
};


var togglePlayFromPlayerBar = function() {
    var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
  if (currentSoundFile.isPaused()) {
      $currentlyPlayingCell.html(pausedButtonTemplate);
      $(this).html(playerBarPauseButton);
      currentSoundFile.play();
  }  else if (currentSoundFile) {
      $currentlyPlayingCell.html(playButtonTemplate);
      $(this).html(playerBarPlayButton);
      currentSoundFile.pause();
  }
};
=======


var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
        } else if (currentParent != element.parentElement) {
            "No parent found with that class name";
        }
        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
>>>>>>> checkpoint-27-assignment

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause')

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
<<<<<<< HEAD
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
<<<<<<< HEAD
 });
//window.onload = function() {
//
//     var albums = [albumPicasso, albumMarconi, albumJustinTimberlake];
//     var index = 1;
//     albumImage.addEventListener('click', function(event) {
//         setCurrentAlbum(album);
//         index++;
//         if (index == album.length) {
//             index = 0;
//         }
//     });
//}
=======
     $playPauseButton.click(togglePlayFromPlayerBar);


     var albums = [albumPicasso, albumMarconi, albumJustinTimberlake];
     var index = 1;
     $(albumImage).addEventListener('click', function(event) {
         setCurrentAlbum(album);
         index++;
         if (index == album.length) {
             index = 0;
         }
     });
>>>> checkpoint-33-assignment
     var clickHandler = function(targetElement) {
         var songNumber = parseInt($(this).attr('data-song-number'));

         if (currentlyPlayingSongNumber !== null) {
             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

             currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
             currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }
         if (currentlyPlayingSong !== songNumber) {
             setSong(songNumber);
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             currentSongFromAlbum = currentAlbum.songs[songNumber -1];

             var $volumeFill = $('.volume .fill');
             var $volumeThumb = $('.volume .thumb');
             $volumeFill.width(currentVolume + '%');
             $volumeThumb.css({left: currentVolume + '%'});

         } else if (currentlyPlayingSongNumber === songNumber) {
             if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
             } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
           }
         }
     };

});
=======

     var albums = [albumPicasso, albumMarconi, albumGeorgeEzra];
     var index = 1;
     albumImage.addEventListener("click", function(event) {
         setCurrentAlbum(album[index]);
         index++;
         if (index == index.length) {
             index = 0;
         }
     });
 };
>>>>>>> checkpoint-25-assignment
