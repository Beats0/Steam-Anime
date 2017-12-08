import requests
import urllib.request
from bs4 import BeautifulSoup
import re
import datetime


starttime = datetime.datetime.now()
base_url = 'http://www.steamcardexchange.net/index.php?gamepage-appid-'
appids = [348950, 268420, 386990, 502120, 449250, 617430, 427980, 470480, 428200, 388800, 273240, 440540, 370460, 333980, 565660, 265870, 265170, 537110, 524850, 283680, 260130, 237890, 565690, 516600, 388750, 352010, 372330, 386480, 716340, 446040, 306930, 461810, 421030, 566750, 408640, 215830, 630060, 458730, 602500, 496260, 531730, 562480, 546080, 324160, 459540, 214610, 536560, 321190, 575010, 360550]
# appids = [459820, 473740, 371120, 331790, 665180, 321290, 413410, 413420, 638930, 542290, 447170, 518280, 639790, 314180, 540610, 617660, 532030, 635730, 348540, 383230, 377880, 606690, 494100, 576400, 484950, 290140, 207370, 207380, 207400, 315810, 511680, 347830, 524580, 504670, 259720, 344770, 606480, 452440, 458750, 311680, 599480, 720280, 333250, 337420, 511740, 460870, 377670, 348240, 251870, 438490,]
# appids = [376300, 520440, 347620, 739000, 606510, 606520, 603120, 421660, 339800, 365350, 418190, 575550, 502300, 546490, 537990, 310360, 410890, 472870, 526490, 577480, 282900, 351710, 353270, 387340, 415480, 622670, 302290, 326480, 377720, 553640, 488660, 487430, 464080, 439350, 402620, 543930, 264360, 551520, 604170, 494160, 581860, 430960, 283060, 349300, 554600, 266150, 520850, 626510, 547340, 350490]
# appids = [559610, 555650, 443330, 366780, 644570, 417110, 212200, 383960, 483980, 416360, 521510, 494170, 386970, 473460, 411370, 581130, 449830, 466920, 623670, 638160, 415300, 529160, 307190, 512180, 524220, 490890, 367020, 534980, 426690, 545400, 325120, 337930, 385800, 333600, 420110, 602520, 482450, 485040, 703700, 575740, 471260, 541450, 494450, 301610, 460150, 323490, 379980, 568750, 562410, 542700]
# appids = [483960, 350810, 565720, 522880, 465520, 632710, 352740, 344630, 421600, 400910, 215100, 250740, 413580, 418340, 543240, 438130, 220700, 435970, 369890, 564150, 701930, 514310, 411830, 502800, 573040, 445430, 370280, 402180, 377680, 407980, 539670, 517000, 421700, 521500, 581520, 575510, 407330, 625400, 607890, 444140, 390730, 383460, 523730, 326950, 632640, 537100, 307050, 571530, 496350, 358750]
# appids = [340730, 629650, 412830, 407340, 377690, 512060, 365850, 546180, 495990, 416630, 460630, 668630, 508260, 342360, 420950, 462990, 363130, 552910, 443380, 687260, 320760, 551730, 368140, 618050, 351970, 349320, 429660, 505090, 352610, 538680, 251290, 251150, 460160, 464490, 593200, 342090, 491420, 680320, 555580, 549850, 552280, 452510, 339910, 340800, 444170, 592360, 447530, 550080, 262150, 300220]
# appids = [575480, 602930, 269250, 368160, 588040, 339250, 398980, 470300, 573780, 454170, 459640, 569210, 610810, 587100, 223810, 223870, 207350, 207320, 477740, 334850, 440810, 258090, 335190, 629960, 490390, 562470, 378790, 616740]

Allshowcase_game_page = []
# Allcards = []
# Allfoilcards = []
Allbadges = []
Allfoilbadges = []
Allemocitons = []
Allbackgrounds = []
AllArtworks_src = ' '

for i in range(len(appids)):
    url = base_url + appids[i].__str__()
    # print('Start url:--------------------------------------------------------------------------------')

    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")

    showcase_game_page = soup.find_all("div", {"class": "showcase-game-page game"})
    cards = soup.find_all("div", {"id": "cards"})

    # #Artworks
    AllArtworks = soup.find_all(href = re.compile("http://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/"),class_='element-link-right')
    AllArtworksLen = len(AllArtworks) // 2

    print('<div class="content-box" id="artworks"><div class="content-box-topbar light"><span class="left"><h3 class="empty">' + url + '</h3></span></div><div class="showcase-element-container background">')
    for index in range(AllArtworksLen):
        print('<img class ="artworks-images" src="" data-lazy="' + AllArtworks[index].get('href') + '">')
        AllArtworks_src = AllArtworks_src + AllArtworks[index].get('href')+' + '
    print('</div></div>')


    foilcards = soup.find_all("div", {"id": "foilcards"})
    badges = soup.find_all("div", {"id": "badges"})
    foilbadges = soup.find_all("div", {"id": "foilbadges"})
    emocitons = soup.find_all("div", {"id": "emocitons"})
    backgrounds = soup.find_all("div", {"id": "backgrounds"})


    Allshowcase_game_page = Allshowcase_game_page + showcase_game_page
    # Allcards = Allcards + cards
    # Allfoilcards = Allfoilcards + foilcards
    Allbadges = Allbadges + badges
    Allfoilbadges = Allfoilbadges + foilbadges
    Allemocitons = Allemocitons + emocitons
    Allbackgrounds = Allbackgrounds + backgrounds
    # # print(soup)
    # print(showcase_game_page)
    # print(cards[0])
    # print(foilcards[0])
    # print(badges[0])
    # print(foilbadges[0])
    # print(emocitons[0])
    # print(backgrounds[0])
    # print(AllArtworks[0].get('href'))
    print('----------------------------------------finished---------------------------------------'+"\n\n")


# print(Allshowcase_game_page)
# print(Allcards)
# print(Allfoilcards)
# print(Allbadges)
# print(Allfoilbadges)
# print(Allemocitons)
# print(Allbackgrounds)

print("\n\n"+'Allshowcase_game_page :')
for j in range(len(Allshowcase_game_page)):
    print(Allshowcase_game_page[j])

# print("\n\n"+'Allcards :')
# for j in range(len(Allcards)):
#     print(Allcards[j])
#
# print("\n\n"+'Allfoilcards :')
# for j in range(len(Allfoilcards)):
#     print(Allfoilcards[j])

print("\n\n"+'Allbadges :')
for j in range(len(Allbadges)):
    print(Allbadges[j])

print("\n\n"+'Allfoilbadges :')
for j in range(len(Allfoilbadges)):
    print(Allfoilbadges[j])

print("\n\n"+'Allemocitons :')
for j in range(len(Allemocitons)):
    print(Allemocitons[j])

print("\n\n"+'Allbackgrounds :')
for j in range(len(Allbackgrounds)):
    print(Allbackgrounds[j])

print("\n\n"+'Allartworks :'+AllArtworks_src)



print("\n\n"+'---------------------------All succeed!!!------------------------------------'+"\n\n")


endtime = datetime.datetime.now()
print("End time  : ", (endtime - starttime).seconds, "s")

