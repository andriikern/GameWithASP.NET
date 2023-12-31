﻿using OnlineWebGame.Data;
using OnlineWebGame.Models;
using OnlineWebGame.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineWebGame.DAO
{
    public class UserInfoDAO
    {
        private GameOnlineContext _db;
        public UserInfoDAO(GameOnlineContext db)
        {
            _db = db;
        }

        public void createUserInfo(UserInfo user)
        {
            _db.UserInfos.Add(user);
            _db.SaveChanges();
        }

        public UserInfo getById(Guid id)
        {
            return _db.UserInfos.FirstOrDefault(u => u.User.UserId == id);
        }

        public void updateUserInfo(UpdateUserInfoViewModel user, Guid userInfoId)
        {
            var existingUser = _db.UserInfos.FirstOrDefault(u => u.UserInfoId == userInfoId);

            if (existingUser is null)
            {
                throw new NullReferenceException();
            }

            existingUser.Coin = user.Coin;
            existingUser.Stamina = user.Stamina;
            existingUser.Exp = user.Exp;
            existingUser.Level = user.Level;
            _db.SaveChanges();
        }

        public void updateUserSta(UserInfo user)
        {
            var existingUser = _db.UserInfos.FirstOrDefault(u => u.UserInfoId == user.UserInfoId);

            if (existingUser is null)
            {
                throw new NullReferenceException();
            }
            existingUser.Stamina = user.Stamina;
            _db.SaveChanges();
        }

        public void updateBestScore(UpdateBestScoreViewModel user, Guid userInfoId)
        {
            var existingUser = _db.UserInfos.FirstOrDefault(u => u.UserInfoId == userInfoId);

            if (existingUser is null)
            {
                throw new NullReferenceException();
            }
            if(user.Game.Equals("2048"))
            {
                existingUser.BestScore2048 = user.BestScore;
                _db.SaveChanges();
            }
            if (user.Game.Equals("flappy"))
            {
                existingUser.BestScoreFlappy = user.BestScore;
                _db.SaveChanges();
            }
            if (user.Game.Equals("robot"))
            {
                existingUser.BestScoreRobot = user.BestScore;
                _db.SaveChanges();
            }
            if (user.Game.Equals("snake"))
            {
                existingUser.BestScoreSnake = user.BestScore;
                _db.SaveChanges();
            }
            
        }

        public List<UserInfo> getLowStaPlayers()
        {
            return _db.UserInfos.Where(u => u.Stamina < 100).ToList();
        }
    }
}
