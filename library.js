const library = {
  tracks: {
    t01: {
      id: 't01',
      name: 'Code Monkey',
      artist: 'Jonathan Coulton',
      album: 'Thing a Week Three',
    },
    t02: {
      id: 't02',
      name: 'Model View Controller',
      artist: 'James Dempsey',
      album: 'WWDC 2003',
    },
    t03: {
      id: 't03',
      name: 'Four Thirty-Three',
      artist: 'John Cage',
      album: 'Woodstock 1952',
    },
  },
  playlists: {
    p01: { id: 'p01', name: 'Coding Music', tracks: ['t01', 't02'] },
    p02: { id: 'p02', name: 'Other Playlist', tracks: ['t03'] },
  },
  // prints a list of all playlists, in the form:
  // p01: Coding Music - 2 tracks
  // p02: Other Playlist - 1 tracks
  printPlaylists: function() {
    // iterate through playlists object and print out the id, name, and number of tracks
    for (const [id, { name, tracks }] of Object.entries(this.playlists)) {
      console.log(`${id}: ${name} - ${tracks.length} tracks`);
    }
  },
  // prints a list of all tracks, using the following format:
  // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
  // t02: Model View Controller by James Dempsey (WWDC 2003)
  // t03: Four Thirty-Three by John Cage (Woodstock 1952)
  printTracks: function() {
    // iterate through tracks object and print out the id, name, artist, and album
    for (const [id, { name, artist, album }] of Object.entries(
      this.tracks
    )) {
      console.log(`${id}: ${name} by ${artist} (${album})`);
    }
  },
  // prints a list of tracks for a given playlist, using the following format:
  // p01: Coding Music - 2 tracks
  // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
  // t02: Model View Controller by James Dempsey (WWDC 2003)
  printPlaylist: function(playlistId) {
    // if no playlist is provided or playlist is not found print message and return
    if (!this.playlists[playlistId])
      return console.log(`Playlist ${playlistId} was not found!`);

    // playlist object
    const playlist = this.playlists[playlistId];
    // print out playlist details
    let output = `${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`;
    // for each track in the playlist print out the id, name, artist, and album
    for (const trackId of playlist.tracks) {
      const track = this.tracks[trackId];
      output += `\n${track.id}: ${track.name} by ${track.artist} (${track.album})`;
    }
    console.log(output);
  },
  // adds an existing track to an existing playlist
  addTrackToPlaylist: function(trackId, playlistId) {
    // if track/playlist is provided or cannot be found, print message and return
    if (!this.tracks[trackId])
      return console.log(`Track ${trackId} was not found!`);
    if (!this.playlists[playlistId])
      return console.log(`Playlist ${playlistId} was not found!`);

    // playlist object
    const playlist = this.playlists[playlistId];
    // add track to the playlist tracks array
    playlist.tracks.push(trackId);
  },
  // generates a unique id
  // (already implemented: use this for addTrack and addPlaylist)
  generateUid: function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },
  // adds a track to the library
  addTrack: function(name, artist, album) {
    // if no name, artist, or album is provided print message
    if (!name) return console.log(`Please provide a name`);
    if (!artist) return console.log(`Please provide an artist`);
    if (!album) return console.log(`Please provide an album`);
    // determine new track number by counting length of array after converting object to array using Object.entries
    let newTrackNum = Object.entries(this.tracks).length + 1;
    // create the new track id; if track is less than 10 include a zero, but if greater than 10 do not
    let newTrackId = `t${newTrackNum < 10 ? '0' + newTrackNum : newTrackNum}`;
    // add the track to the library.tracks object
    this.tracks[newTrackId] = { id: this.generateUid(), name, artist, album };
  },
  // adds a playlist to the library
  addPlaylist: function(name) {
    // if a name is not provided for the playlist, print a message and return
    if (!name) return console.log(`Please provide a name for the playlist`);
    // determine new playlist number by counting length of array after converting object to array using Object.entries
    let newPlaylistNum = Object.entries(this.playlists).length + 1;
    // create the new playlist id; if track is less than 10 include a zero, but if greater than 10 do not
    let newPlaylistId = `p${
      newPlaylistNum < 10 ? '0' + newPlaylistNum : newPlaylistNum
    }`;
    // add the track to the library.tracks object
    this.playlists[newPlaylistId] = { id: this.generateUid(), name, tracks: [] };
  },
  // STRETCH:
  // given a query string string, prints a list of tracks
  // where the name, artist or album contains the query string (case insensitive)
  // tip: use "string".search("tri")
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
  printSearchResults: function(query) {
    // if the query is not provided, print a message and return
    if (!query) return console.log('Please add a search term and try again.');
    // normalize the query by converting to lowercase
    const q = query.toLowerCase();
    // initialize a trackList to store the tracks matching the query
    const trackList = [];
    // loop through the library.tracks object and if query is found within the
    // name, artist, or album values, add that track to the track list
    for (const [track, { name, artist, album }] of Object.entries(
      this.tracks
    )) {
      // normalize each value by converting to lowercase
      const n = name.toLowerCase(),
        ar = artist.toLowerCase(),
        al = album.toLowerCase();
      // if searching through any of the values produces something other than -1,
      // it means there was a match, so the track can be added to the trackList
      if (n.search(q) !== -1 || ar.search(q) !== -1 || al.search(q) !== -1) {
        trackList[track] = { ...this.tracks[track] };
      }
    }
    console.log(trackList);
  },
};

/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

// library.printPlaylists();

// library.printTracks();

// library.printPlaylist('p01');
// library.printPlaylist('p02');

// console.log(library.playlists.p01.tracks, library.playlists.p02.tracks);
// library.addTrackToPlaylist('t02', 'p02');
// library.addTrackToPlaylist('t04', 'p02');
// library.addTrackToPlaylist('t02', 'p04');
// console.log(library.playlists.p01.tracks, library.playlists.p02.tracks);

// console.log(library);
// library.addTrack('testname', 'testartist', 'testalbum');
// library.addTrack('', 'testartist', 'testalbum');
// library.addTrack('testname', '', 'testalbum');
// library.addTrack('testname', 'testartist', '');
// console.log(library);

// console.log(library);
// library.addPlaylist('testnewplaylist');
// console.log(library);

library.printSearchResults('james');
library.printSearchResults('W');
library.printSearchResults('');
library.printSearchResults('four');
