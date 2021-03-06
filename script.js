const tunerApp = {}; //namespace 

tunerApp.$tuner = $('.tuner');

tunerApp.init = function () {
    tunerApp.updateTuner();
    tunerApp.playSound();
}

tunerApp.updateTuner = () => {

    $('select').change(function () {

        const songList = {
            standard: ['Free Fallin\' - Tom Petty', 'Tears in Heaven - Eric Clapton', 'Gravity - John Mayer'],
            fullStepDown: ['Say Goodnight - Bullet For My Valentine', 'Adam\'s Song - Blink-182', 'Timshel - Mumford & Sons'],
            halfStepDown: ['Swing Life Away - Rise Against', 'Sweet Child O\' Mine - Guns N\' Roses', 'Bold As Love - Jimi Hendrix']
        }
        const selection = $('select').val();
        const formattedSelection = $('select').find(':selected').text();
        const currentSongList = songList[selection];
        const notes = {
            standard: ['E', 'A', 'D', 'G', 'B', 'E'],
            fullStepDown: ['D', 'G', 'C', 'F', 'A', 'D'],
            halfStepDown: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
            noSelection: []
        }
        const $popularSongs = $('.list-songs ul');

        // empty tuner & popular song list after every change in Selection
        tunerApp.$tuner.empty();
        $popularSongs.empty();

        // populate tuner with buttons based on the Selection
        let stringCount = 6;
        notes[selection].forEach((i) => {
            tunerApp.$tuner.append(`<div class="button" tabindex="0" data-string="${stringCount}">${i}</div>`);
            stringCount--;
        })

        // change background colour of tuner based on the Selection

        tunerApp.$tuner.removeClass('full-step half-step standard');
        if (selection === "fullStepDown") {
            tunerApp.$tuner.addClass('full-step');
        } else if (selection === "halfStepDown") {
            tunerApp.$tuner.addClass('half-step');
        } else if (selection === "standard") {
            tunerApp.$tuner.addClass('standard');
        }

        if (selection === "noSelection") {
            $('.list-title').html(`<h2>Please select a tuning above</h2>`);
            $('.message').text('');
        } else {
            $('.list-title').html(`<h2>Popular songs in <span>${formattedSelection}</span> tuning</h2>`);
            $('.message').text('click a button to hear the corresponding note:');
        }

        currentSongList.forEach(i => {
            $popularSongs.append(`<li>${i}</li>`);
        });
    });
}

tunerApp.playSound = () => {

    const tuningSounds = {
        standard: [
            "assets/sounds/standard-1.wav",
            "assets/sounds/standard-2.wav",
            "assets/sounds/standard-3.wav",
            "assets/sounds/standard-4.wav",
            "assets/sounds/standard-5.wav",
            "assets/sounds/standard-6.wav",
        ],
        fullStepDown: [
            "assets/sounds/full-step-1.wav",
            "assets/sounds/full-step-2.wav",
            "assets/sounds/full-step-3.wav",
            "assets/sounds/full-step-4.wav",
            "assets/sounds/full-step-5.wav",
            "assets/sounds/full-step-6.wav",
        ],
        halfStepDown: [
            "assets/sounds/half-step-1.wav",
            "assets/sounds/half-step-2.wav",
            "assets/sounds/half-step-3.wav",
            "assets/sounds/half-step-4.wav",
            "assets/sounds/half-step-5.wav",
            "assets/sounds/half-step-6.wav",
        ]
    };  // all audio files were created by me.

    tunerApp.$tuner.on('click', '.button', function () { // event bubbling

        // get the current note from the button pressed
        const currentButton = $(this).data('string');

        // using the note defined above, find corresponding audio file from the tuningSounds array
        const currentSelection = $('select').val();
        const audioFile = tuningSounds[currentSelection][currentButton - 1];

        // create new Audio object, passing in the audio file
        const sound = new Audio(audioFile);

        // use play method to play the sound
        sound.play();
    });

    tunerApp.$tuner.on('keypress', '.button', function (e) { // event bubbling

        console.log(e.keyCode);
        if (e.keyCode === 13) {
            // get the current note from the button pressed
            const currentButton = $(this).data('string');

            // using the note defined above, find corresponding audio file from the tuningSounds array
            const currentSelection = $('select').val();
            const audioFile = tuningSounds[currentSelection][currentButton - 1];

            // create new Audio object, passing in the audio file
            const sound = new Audio(audioFile);

            // use play method to play the sound
            sound.play();
        }
    });
}

$(function () {

    tunerApp.init();

});