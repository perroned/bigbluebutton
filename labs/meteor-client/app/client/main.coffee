@grabAllDBID = ->
  array = []
  for u in Meteor.Users.find().fetch()
    array.push(u._id)
  return array

# Helper to load javascript libraries from the BBB server
loadLib = (libname) ->
  successCallback = ->

  retryMessageCallback = (param) ->
    console.log "Failed to load #{JSON.stringify(param)}"

  Meteor.Loader.loadJs("http://#{window.location.hostname}/client/lib/#{libname}", successCallback, 10000).fail(retryMessageCallback)


# These settings can just be stored locally in session, created at start up
Meteor.startup ->

  # Load SIP libraries before the application starts
  loadLib('sip-0.6.1.js')
  loadLib('bbb_webrtc_bridge_sip.js')

  @SessionAmplify = _.extend({}, Session,
    keys: _.object(_.map(amplify.store(), (value, key) ->
      [
        key
        JSON.stringify(value)
      ]
    ))
    set: (key, value) ->
      Session.set.apply this, arguments
      amplify.store key, value
      return
  )

  # Meteor.autorun ->
  #   if Meteor.status().connected
  #     console.log("connected")
  #     uid = getInSession("userId")
  #     # Obtain user info here. for testing. should be moved somewhere else later
  #     Meteor.call "getMyInfo", uid, (error, result) -> #TODO should try to get rid of this?
  #       if error? then console.log "error:" + error
  #       else

  setInSession "display_usersList", true
  setInSession "display_navbar", true
  setInSession "display_chatbar", true
  setInSession "display_whiteboard", true
  setInSession "display_chatPane", true
  setInSession "joinedAt", getTime()
  setInSession "inChatWith", 'PUBLIC_CHAT'
  setInSession "messageFontSize", 12
  setInSession "dateOfBuild", Meteor.config?.dateOfBuild or "UNKNOWN DATE"
  setInSession "bbbServerVersion", Meteor.config?.bbbServerVersion or "UNKNOWN VERSION"
  setInSession "displayChatNotifications", true
  # --------------------------------------------------------------------------------------
  # i18n set up
  updateLanguage(null) # arg0: (null) - Try to retrieve system language first

  # start a clientside-only collection keeping track of the chat tabs
  @chatTabs = new Meteor.Collection(null)
  # insert the basic tabs
  @chatTabs.insert({ userId: "PUBLIC_CHAT", name: (TAPi18n.__('public',null)), gotMail: false, class: "publicChatTab"})
  @chatTabs.insert({ userId: "OPTIONS", name: (TAPi18n.__('options',null)), gotMail: false, class: "optionsChatTab"})
# --------------------------------------------------------------------------------------------------------

Template.footer.helpers
  getFooterString: ->
    # info = Meteor.call('getServerInfo')
    TAPi18n.__('footerString', { 'dateOfBuild': getInSession('dateOfBuild'), 'version': getInSession("bbbServerVersion"), 'copyrightYear': ((new Date()).getFullYear()) })

Template.header.events
  "click .audioFeedIcon": (event) ->
    $(".tooltip").hide()
    toggleVoiceCall @

  "click .chatBarIcon": (event) ->
    $(".tooltip").hide()
    toggleChatbar()

  "click .hideNavbarIcon": (event) ->
    $(".tooltip").hide()
    toggleNavbar()

  "click .lowerHand": (event) ->
    $(".tooltip").hide()
    Meteor.call('userLowerHand', getInSession("meetingId"), getInSession("DBID"), getInSession("userId"), getInSession("DBID") )
  
  "click .muteIcon": (event) ->
    $(".tooltip").hide()
    toggleMic @

  "click .raiseHand": (event) ->
    $(".tooltip").hide()
    Meteor.call('userRaiseHand', getInSession("meetingId"), getInSession("DBID"), getInSession("userId"), getInSession("DBID") )
    # "click .settingsIcon": (event) ->
    #   alert "settings"

  "click .signOutIcon": (event) ->
    response = confirm(TAPi18n.__('exitPrompt'))
    if response
      userLogout getInSession("meetingId"), getInSession("userId"), true

  "click .usersListIcon": (event) ->
    $(".tooltip").hide()
    toggleUsersList()

  "click .videoFeedIcon": (event) ->
    $(".tooltip").hide()
    toggleCam @

  "click .whiteboardIcon": (event) ->
    $(".tooltip").hide()
    toggleWhiteBoard()

  "mouseout #navbarMinimizedButton": (event) ->
    $("#navbarMinimizedButton").removeClass("navbarMinimizedButtonLarge")
    $("#navbarMinimizedButton").addClass("navbarMinimizedButtonSmall")

  "mouseover #navbarMinimizedButton": (event) ->
    $("#navbarMinimizedButton").removeClass("navbarMinimizedButtonSmall")
    $("#navbarMinimizedButton").addClass("navbarMinimizedButtonLarge")

Template.main.helpers
	setTitle: ->
		document.title = "BigBlueButton #{window.getMeetingName() ? 'HTML5'}"

Template.makeButton.rendered = ->
  $('button[rel=tooltip]').tooltip()

Template.recordingStatus.rendered = ->
  $('button[rel=tooltip]').tooltip()
