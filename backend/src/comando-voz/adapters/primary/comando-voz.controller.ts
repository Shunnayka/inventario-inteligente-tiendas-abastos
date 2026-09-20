import { Body, Controller, Post } from '@nestjs/common';
import { EjecutarComandoVozUseCase } from '../../application/ejecutar-comando-voz.use-case';
import { EjecutarComandoVozDto } from '../../dto/ejecutar-comando-voz.dto';

@Controller('comandos-voz')
export class ComandoVozController {
  constructor(private readonly ejecutarComandoVoz: EjecutarComandoVozUseCase) {}

  @Post()
  ejecutar(@Body() dto: EjecutarComandoVozDto) {
    return this.ejecutarComandoVoz.ejecutar(dto);
  }
}