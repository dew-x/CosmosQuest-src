<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest");
doMenu();
$content='
    <p>Cosmos Quest is the first game developed by GaiaByte, it was released on Kongregate on the 17th of February of 2017.</p>

    <p>Based on the <a href="https://en.wikipedia.org/wiki/Kardashev_scale" target="_blank">Kardashev Scale</a>, 
    the player will collect energy in order to conquer space and time through technology. Each player will control the fate of their species starting from a mere Caveman evolving into timeless beings.</p> 

    <a href="http://www.kongregate.com/games/GaiaByte/cosmos-quest" target="_blank"><img class="icon pure-img" src="img/icon.png"></a>

    <p>
        This website contains data related to gameplay activities within Cosmos Quest, to respect your privacy we hide all player Usernames. In order to enable your Username to be displayed on this website you must give us permission by selecting the \'Display Name\' toggle in the Options menu in-game. You can turn this off at any time through the same method.<br>
		
        You can search player data by searching the username in the <a href="user.php">User</a> section. This will only show users that have given permission for their username to be displayed.<br>
		
        Seasonal <a href="highscores.php">Higscore records</a> enable players to track their Seasonal Tournament performance, at the end of each Season players are rewarded based on their performance.<br>
        You can find the history of tournaments on the <a href="tournaments.php">Tournaments</a> page.
    </p>

    <p>
        </p><h2>Season 11 Rules</h2>
        <h3>Tournament modes</h3>
        	- <span class="hl">5 lives</span>: Players will fight against a random opponent (without repetition). After losing 5 times players are eliminated. Players are then ranked based on the round they lost in first, and then damage dealt as a decider.<br>
	        - <span class="hl">Lane League</span>: Players will fight against all other players earning points based on wins for each lane. After playing a fixed amount of players everyone will be ranked based on their total score of points and then damage dealt will be a deciding factor. <br>
        	- <span class="hl">Page Rank</span>: Players will fight against all other players earning points based on wins. Wins against a player with a higher win ratio are more valuable than wins against a player with a lower win ratio. Players are ranked based on their points, and then damage dealt as a decider.<br>
        <h3>Hero modes</h3>
		- <span class="hl">Your Heroes</span>: Players can use all Heroes they have unlocked.<br>
		- <span class="hl">Boring Common & Rare</span>: Players cannot use a random selection of heroes without too complicated skills (All players have the same selection).<br>
	        - <span class="hl">Tanks</span>: Players can use a random selection of tanky Legenendaries and Ascendeds (All players have the same selection).<br>
        	- <span class="hl">Your Legendary</span>: Players can use all Legendary Heroes they have unlocked.<br>
        	- <span class="hl">Air & Fire</span>: Players can use a random selection of Heroes with the Air or Fire element (All players have the same selection).<br>
		- <span class="hl">Your Common</span>: Players can use all Common Heroes they have unlocked.<br>
        	- <span class="hl">Random Rare</span>: Players can use a random selection of Rare Heroes (All players have the same selection).<br>
        	- <span class="hl">Super Legendary</span>: Players can use a random selection of Legendary Heroes with high level and promotions (All players have the same selection).<br>
		- <span class="hl">Your Rare</span>: Players can use all Rare Heroes they have unlocked.<br>
        	- <span class="hl">Random Chest</span>: Players can use a random selection of Chest Heroes (All players have the same selection).<br>
        	- <span class="hl">Water & Earth</span>: Players can use a random selection of Heroes with the Water or Fire element (All players have the same selection).<br>

        <h3>Follower modes</h3>
        - Each tournament players have access to an amount of Followers that is generated based on the strength of Heroes available in that tournament. Players will find in most tournaments they should be able to use a strong balance of the Heroes available as well as the Followers available to purchase Monsters. <br>
    </p>
';
doContent($content,"Cosmos Quest");
doFooter();
?>
