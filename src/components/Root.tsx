import { useShell } from '@dxos/react-client'
import { useSpace } from '@dxos/react-client/echo'
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

export const Root = () => {
  const navigate = useNavigate()
  const space = useSpace()
  const shell = useShell()

  const [search, setSearchParams] = useSearchParams()
  const spaceInvitationCode = search.get('spaceInvitationCode')
  const deviceInvitationCode = search.get('deviceInvitationCode')

  useEffect(() => {
    const removeParam = (key: string) => {
      setSearchParams(p => {
        p.delete(key)
        return p
      })
    }

    if (deviceInvitationCode) {
      removeParam('deviceInvitationCode')
    } else if (spaceInvitationCode) {
      removeParam('spaceInvitationCode')

      const joinSpace = async () => {
        const { space } = await shell.joinSpace({ invitationCode: spaceInvitationCode })
        if (space) {
          navigate(`/space/${space.id}`)
        }
      }
      void joinSpace()
    }
  }, [spaceInvitationCode, deviceInvitationCode])

  return space ? <Navigate to={`/space/${space.id}`} /> : null
}
