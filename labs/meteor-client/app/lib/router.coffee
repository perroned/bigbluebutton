# Todo
# When a user is to be kicked remove their authorization token from servers

@Router.configure layoutTemplate: 'layout'

@Router.map ->
  @route "login",
    path: "/meeting_id=*"
    action: () ->
      self = @
      url = location.href
      console.log "\n\nurl=#{url}\n\n"
      #extract the meeting_id, user_id, auth_token, etc from the uri
      if url.indexOf("meeting_id") > -1 # if the URL is /meeting_id=...&...
        urlParts = url.split("&")
        meetingId = urlParts[0]?.split("=")[1]
        userId = urlParts[1]?.split("=")[1]
        authToken = urlParts[2]?.split("=")[1]

        if meetingId? and userId? and authToken?
          Meteor.call("validateAuthToken", meetingId, userId, authToken, ->
            if Meteor.isClient then sendMeetingInfoToClient(meetingId, userId)
            self.redirect('/')
          )

        else
          console.log "unable to extract from the URL some of {meetingId, userId, authToken}"
      else
        console.log "unable to extract the required information for the meeting from the URL"
  @route "main",
    path: "/"
    onBeforeAction: ->
      meetingId = getInSession('meetingId')
      userId = getInSession("userId")
      console.log "on /: meetingId=#{meetingId} userId=#{userId}"
      Meteor.subscribe 'users', meetingId, userId, -> # callback for after users have been loaded on client
        Meteor.subscribe 'chat', meetingId, userId, ->
          Meteor.subscribe 'shapes', meetingId, ->
            Meteor.subscribe 'slides', meetingId, ->
              Meteor.subscribe 'meetings', meetingId, ->
                Meteor.subscribe 'presentations', meetingId, ->
                  Meteor.call "getMyInfo", userId, (error, result) ->
                    #console.log "managed to reconnect successfully"
                    setInSession("DBID", result.DBID)
                    setInSession("userName", result.name)

  @route "logout",
    path: "logout"
