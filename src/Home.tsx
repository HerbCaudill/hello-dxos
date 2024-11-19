import { useShell } from '@dxos/react-client'
import { useSpace } from '@dxos/react-client/echo'
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

export const Home = () => {
  const space = useSpace()
  const shell = useShell()
  const [search, setSearchParams] = useSearchParams()
  const invitationCode = search.get('spaceInvitationCode')
  const deviceInvitationCode = search.get('deviceInvitationCode')
  const navigate = useNavigate()

  useEffect(() => {
    if (deviceInvitationCode) {
      setSearchParams(p => {
        p.delete('deviceInvitationCode')
        return p
      })
    } else if (invitationCode) {
      setSearchParams(p => {
        p.delete('spaceInvitationCode')
        return p
      })
      void (async () => {
        const { space } = await shell.joinSpace({ invitationCode })
        if (space) {
          navigate(`/space/${space.id}`)
        }
      })()
    }
  }, [invitationCode, deviceInvitationCode])

  return space ? <Navigate to={`/space/${space.id}`} /> : null
}
