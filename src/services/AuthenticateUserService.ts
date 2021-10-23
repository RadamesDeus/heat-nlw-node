import axios from "axios"
import { sign } from "jsonwebtoken";
import authConfig from '../config/auth';
import prismaClient from '../prisma';


interface IRespnseGit {
  access_token: string;
}

interface IRespnseUserGit {
  login: string,
  id: number,
  avatar_url: string,
  url: string,
  name: string,
  email: string,
  bio: string,
}

class AuthenticateUserService {
  async execute(code: string) {
    const res = await axios.post<IRespnseGit>('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })
    const { access_token } = res.data

    const userdata = await axios.get<IRespnseUserGit>('https://api.github.com/user', {
      headers: { authorization: `Bearer ${access_token}` }
    })

    const { login, id, avatar_url, name } = userdata.data
    let user = await prismaClient.user.findFirst({
      where: { github_id: id }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          avatar_url,
          login,
          name
        }
      })
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id,
      }
    },
      secret,
      {
        subject: user.id,
        expiresIn,
      });


    return { token, user }
  }

}

export { AuthenticateUserService }