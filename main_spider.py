import requests
import urllib.request
from bs4 import BeautifulSoup
import re
import datetime


starttime = datetime.datetime.now()

base_url = 'http://www.steamcardexchange.net/index.php?gamepage-appid-'
appids = [315810,333600,385800,420110,602520]
All_showcase_games = ''
for i in range(len(appids)):
    url = base_url + appids[i].__str__()
    print('Start url:----------------------------------------'+url+'----------------------------------------')

    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")

    showcase_game_page = soup.find_all("div", {"class": "showcase-game-page game"})
    cards = soup.find_all("div", {"id": "cards"})

    # Artworks
    AllArtworks = soup.find_all(
        href=re.compile("http://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/"),
        class_='element-link-right')
    AllArtworksLen = len(AllArtworks) // 2
    print(AllArtworksLen)
    print(
        '<div class="content-box" id="artworks"><div class="content-box-topbar light"><span class="left"><h3 class="empty">' + url + '</h3></span></div><div class="showcase-element-container background">')

    for index in range(AllArtworksLen):
        print('<img class="artworks-images" src="' + AllArtworks[index].get('href') + '">')

    print('</div></div>')
    print("AllArtworks finished")

    foilcards = soup.find_all("div", {"id": "foilcards"})
    booster = soup.find_all("div", {"id": "booster"})
    badges = soup.find_all("div", {"id": "badges"})
    foilbadges = soup.find_all("div", {"id": "foilbadges"})
    emocitons = soup.find_all("div", {"id": "emocitons"})
    backgrounds = soup.find_all("div", {"id": "backgrounds"})

    All_showcase_games = showcase_game_page[0] + All_showcase_games.__str__()
    print(All_showcase_games)

    # print(soup)
    print(showcase_game_page)
    print(cards[0])
    print(foilcards[0])
    print(booster[0])
    print(badges[0])
    print(foilbadges[0])
    print(emocitons[0])
    print(backgrounds[0])
    # print(AllArtworks[0].get('href'))
    finishedtime = datetime.datetime.now()
    print("Url has finished at:" + url)
    print("已用时间: ", (finishedtime - starttime).seconds, "s"  + "\n\n")

print("All succeed!!!")
endtime = datetime.datetime.now()
print ("所有用时: ", (endtime - starttime).seconds, "s")

