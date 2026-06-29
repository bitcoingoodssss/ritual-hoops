export type Lang = 'zh' | 'en';

const translations = {
  menu: {
    title:             { zh: 'RITUAL HOOPS',                    en: 'RITUAL HOOPS' },
    subtitle:          { zh: '链上篮球锦标赛',                   en: 'Chain Basketball Championship' },
    live:              { zh: 'RITUAL链直播中',                   en: 'LIVE ON RITUAL CHAIN' },
    enterTwitter:      { zh: '输入你的Twitter ID',               en: 'Enter Your Twitter ID' },
    placeholder:       { zh: '你的Twitter用户名',                en: 'your_twitter_handle' },
    play:              { zh: '开始游戏',                         en: 'PLAY' },
    loading:           { zh: '加载中',                           en: 'Loading' },
    avatarPreview:     { zh: '以',                               en: 'Playing as' },
    avatarPreviewEnd:  { zh: '的身份游戏',                       en: '' },
    errorAvatar:       { zh: '找不到该Twitter账号，请确认ID是否正确',              en: 'Twitter account not found. Please check your ID.' },
    connectFirst:      { zh: '请先连接钱包',                          en: 'Please connect wallet first' },
    tournament:        { zh: '锦标赛',                           en: 'Tournament' },
    rounds:            { zh: '5轮',                              en: '5 Rounds' },
    vs:                { zh: '1v1',                              en: '1v1' },
    basketball:        { zh: '篮球',                             en: 'Basketball' },
    nfts:              { zh: 'NFT',                              en: 'NFT' },
    powerUp:           { zh: '强化装备',                         en: 'Power Up' },
    nftShop:           { zh: '🛒 NFT商店',                      en: '🛒 NFT Shop' },
    connectWallet:     { zh: '🔗 连接钱包',                     en: '🔗 Connect Wallet' },
    walletConnected:   { zh: '✅ 钱包已连接',                    en: '✅ Wallet Connected' },
    poweredBy:         { zh: 'Powered by Ritual Network',       en: 'Powered by Ritual Network' },
    gameRule:          { zh: '先得11分获胜 • 每场3分钟',         en: 'First to 11 points wins • 3 min per game' },
  },
  wallet: {
    connectTitle: { zh: '连接钱包',                              en: 'Connect Wallet' },
    connectDesc:  { zh: '连接Ritual链上的钱包来铸造NFT',          en: 'Connect your wallet on Ritual Chain to mint NFTs' },
    cancel:       { zh: '取消',                                  en: 'Cancel' },
  },
  hud: {
    you:       { zh: '你',                  en: 'YOU' },
    opp:       { zh: '对手',                en: 'OPP' },
    round:     { zh: '第{r}轮/5',           en: 'Round {r}/5' },
    shotClock: { zh: '投篮计时',            en: 'SHOT CLOCK' },
    time:      { zh: '时间',                en: 'TIME' },
    yourBall:  { zh: '🏀 你的球',           en: '🏀 YOUR BALL' },
    oppBall:   { zh: '⚠️ 对手控球',         en: '⚠️ OPPONENT BALL' },
    nftBonus:  { zh: 'NFT加成',             en: 'NFT BONUSES' },
    combo:     { zh: '🔥 {n}连击!',         en: '🔥 {n}x COMBO!' },
  },
  controls: {
    label:        { zh: '🎮 操作说明',                      en: '🎮 CONTROLS' },
    move:         { zh: '移动',                             en: 'Move' },
    jump:         { zh: '跳跃',                             en: 'Jump' },
    shoot:        { zh: '投篮(按住蓄力松开)',                en: 'Shoot (hold & release)' },
    dunk:         { zh: '扣篮(靠近篮筐)',                   en: 'Dunk (near hoop)' },
    steal:        { zh: '抢断',                             en: 'Steal' },
    sprint:       { zh: '加速',                             en: 'Sprint' },
    tipLine:      { zh: '向对手篮筐(远端)得分 • 先得11分获胜', en: 'Score on OPPONENT hoop (far side) • First to 11 wins' },
    toggleHint:   { zh: '按 [H] 切换',                      en: 'Press [H] to toggle' },
  },
  hints: {
    shoot:  { zh: '按 [E] 投篮',          en: 'Press [E] to Shoot' },
    dunk:   { zh: '按 [F] 扣篮!',         en: 'Press [F] to Dunk!' },
    steal:  { zh: '按 [Q] 抢断',          en: 'Press [Q] to Steal' },
    sprint: { zh: '按住 [SHIFT] 加速',    en: 'Hold [SHIFT] to Sprint' },
    move:   { zh: '使用 [WASD] 移动',     en: 'Use [WASD] to Move' },
  },
  gameOver: {
    victory:    { zh: '🏆 胜利!',            en: '🏆 VICTORY!' },
    defeat:     { zh: '💔 失败',              en: '💔 DEFEAT' },
    roundDone:  { zh: '第{r}轮完成',         en: 'Round {r} Complete' },
    progress:   { zh: '锦标赛进度',            en: 'Tournament Progress' },
    nextRound:  { zh: '下一轮 →',             en: 'NEXT ROUND →' },
    restart:    { zh: '重新开始',              en: 'RESTART' },
    newTourney: { zh: '🏆 新锦标赛',          en: '🏆 NEW TOURNAMENT' },
  },
  champ: {
    title:    { zh: '冠军!',                    en: 'CHAMPION!' },
    subtitle: { zh: '你击败了全部5个对手!',     en: 'You conquered all 5 opponents!' },
    tagline:  { zh: 'Ritual链篮球冠军',         en: 'Ritual Chain Basketball Champion' },
    rewards:  { zh: '获得奖励',                 en: 'REWARDS EARNED' },
    trophy:   { zh: '金奖杯NFT',               en: 'Gold Trophy NFT' },
    again:    { zh: '再来一局 🔄',             en: 'PLAY AGAIN 🔄' },
  },
  shop: {
    back:          { zh: '返回',                   en: 'Back' },
    tabShop:       { zh: '🛒 商店',                en: '🛒 Shop' },
    tabHistory:    { zh: '📊 记录',                en: '📊 History' },
    equippedGear:  { zh: '已装备',                 en: 'Equipped Gear' },
    noItem:        { zh: '无',                     en: 'No' },
    remove:        { zh: '移除',                   en: 'Remove' },
    all:           { zh: '📦 全部',                en: '📦 All' },
    onRitual:      { zh: 'Ritual链',               en: 'On Ritual Chain' },
    equipped:      { zh: '✓ 已装备',               en: '✓ Equipped' },
    equip:         { zh: '装备',                   en: 'Equip' },
    mintFor:       { zh: '铸造',                   en: 'Mint for' },
    minting:       { zh: '铸造中...',              en: 'Minting...' },
    history:       { zh: '游戏记录',               en: 'Game History' },
    connectToView: { zh: '连接钱包查看游戏记录',    en: 'Connect your wallet to view game history' },
    noGames:       { zh: '还没有记录，去比赛吧！',  en: 'No games played yet. Go compete!' },
    win:           { zh: '胜利',                   en: 'WIN' },
    loss:          { zh: '失败',                   en: 'LOSS' },
    pts:           { zh: '得分',                   en: 'PTS' },
    stl:           { zh: '抢断',                   en: 'STL' },
    typeJersey:    { zh: '球衣',                   en: 'JERSEY' },
    typeShoes:     { zh: '球鞋',                   en: 'SHOES' },
    typeHeadband:  { zh: '头带',                   en: 'HEADBAND' },
    typeAccessory: { zh: '配件',                   en: 'ACCESSORY' },
  },
} as const;

type Leaf = { zh: string; en: string };

export function t(key: string, lang: Lang, params?: Record<string, string | number>): string {
  const segs = key.split('.');
  let cur: unknown = translations;
  for (const s of segs) {
    if (cur == null || typeof cur !== 'object') return key;
    cur = (cur as Record<string, unknown>)[s];
  }
  if (cur == null || typeof cur !== 'object' || !('zh' in (cur as object))) return key;
  let result: string = (cur as Leaf)[lang] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) result = result.replaceAll(`{${k}}`, String(v));
  }
  return result;
}

export default translations;