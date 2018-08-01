import React, {Component} from 'react';
import lottery from './lottery'
import {Button, Container, Message, Card, Image, Icon, Label, Statistic} from 'semantic-ui-react'
import web3 from './web3'

class App extends Component {
    state = {
        manager: '',
        playerCount: '',
        balance: '',
        loading: false,
        showButton: 'none',
        loading1: false,
        loading2: false,
    }

    async componentDidMount() {
        let manager = await lottery.methods.getManager().call();
        let playerCount = await lottery.methods.getPlayerCount().call()
        let balance = await lottery.methods.getBalance().call()
        this.setState({
            manager: manager,
            playerCount: playerCount,
            balance: web3.utils.fromWei(balance,'ether')
        })
        let account = await web3.eth.getAccounts()
        if (account[0]=== manager){
            this.setState({showButton:'inline'})
        }else{
            this.setState({showButton:'none'})
        }
    }
    enter=async()=>{
        this.setState({loading:true})
        let account = await web3.eth.getAccounts()
        await lottery.methods.enter().send({
            from:account[0],
            gas:'1000000',
            value:'1000000000000000000'
        })
        this.setState({loading:false})
        window.location.reload(true)
    }
    pickWinner=async()=>{
        this.setState({loading1:true})
        let account = await web3.eth.getAccounts()
        await lottery.methods.pickWinner().send({
            from:account[0]
        })
        this.setState({loading1:false})
        window.location.reload(true)

    }
    refund= async()=>{
         this.setState({loading2:true})
        // let players = await lottery.methods.getPlayer().call();
        let account = await web3.eth.getAccounts()
        await lottery.methods.refund().send({
            from:account[0]
        })

        // try {
        //     await lottery.methods.refund().call()
        // } catch (e) {
        //      console.log(e)
        // }

        // await lottery.methods.refund().send({
        //     from:lottery["_address"],
        //     gas:"3000000"
        // })

        this.setState({loading2:false})
        window.location.reload(true)

    }


    render() {
        return (
            <div>
                <Container>
                    <br/>
                    <Message info>
                        <Message.Header>彩票网站</Message.Header>
                        <p>快来买啊快来买啊</p>
                    </Message>
                    <Card style={{width: 320}}>
                        <Image src='/images/logo.jpg'/>
                        <Card.Content>
                            <Card.Header>六合彩</Card.Header>
                            <Card.Meta>
                                <p>管理员地址</p>
                                <Label size='mini' style={{marginLeft: -5}}>
                                    {this.state.manager}
                                </Label>
                            </Card.Meta>
                            <Card.Description>每周三晚上8点开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                参与人数{this.state.playerCount}
                            </a>
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic color='red'>
                                <Statistic.Value>{this.state.balance} ether </Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade' onClick={this.enter} loading={this.state.loading} disabled={this.state.loading}>
                            <Button.Content visible >快来买一注</Button.Content>
                            <Button.Content hidden>买了中大奖</Button.Content>
                        </Button>
                        <Button color='yellow' style={{display: this.state.showButton}} onClick={this.pickWinner} loading={this.state.loading1} disabled={this.state.loading1}>开奖</Button>
                        <Button color='red' style={{display: this.state.showButton}} onClick={this.refund} loading={this.state.loading2} disabled={this.state.loading2}>退钱</Button>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default App;
